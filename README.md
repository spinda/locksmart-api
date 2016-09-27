# locksmart-api

> API client for the Dog & Bone LockSmart service

[![npm version](https://img.shields.io/npm/v/locksmart-api.svg)](https://www.npmjs.com/package/locksmart-api)
[![code climate](https://img.shields.io/codeclimate/github/spinda/locksmart-api.svg)](https://codeclimate.com/github/spinda/locksmart-api)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

## Background

[*Dog & Bone*](https://www.dogandbonecases.com/) sell a set of Bluetooth
LE-enabled padlocks that can be opened with their
["LockSmart" app](https://play.google.com/store/apps/details?id=com.dogandbonecases.locksmart).
The app stores and retrieves lock information via an HTTP API, including a
random per-lock "password" used for unlocking. This package implements a client
for that API.

At the moment this only implements logging in and pulling lock information, as
that's all I've needed personally. Adding support for additional endpoints
should be pretty simple, and descriptions of all known endpoints can be found in
the [RESEARCH](/RESEARCH) file. Pull requests very welcome!

## Install

```
npm install --save locksmart-api
```

## Example

```javascript
const { LockSmartApiClient } = require('locksmart-api');
const co = require('co');

co(function * () {
  const client = new LockSmartApiClient();

  const userData = yield client.login('jane.doe@example.com', 'password123');
  console.log('user data:', userData);
  /* user data: { email: 'jane.doe@example.com',
       apn_token: null,
       android_token: null,
       register_source: 'default',
       crowd_sourced_locations: false,
       notify_shared_lock_status: false,
       first: 'Jane',
       last: 'Doe',
       mobile: '1234567890',
       id: 'ffffffffffffffffffffffff',
       facebook_id: null,
       opt_out: true,
       is_deleted: false } */

  const lockInfo = yield client.getLocks();
  console.log('lock info:', lockInfo);
  /* lock info: { locks: 
        [ { name: 'My Padlock',
            serial: 'FFFFFFFFFFFF',
            photo_url: null,
            access: 'tap',
            push_unlock_enabled: false,
            found_notification_requested: false,
            location_enabled: false,
            tracking_enabled: false,
            power_save: false,
            notify_battery: true,
            notify_invite_accepted: true,
            notify_share_unlock: true,
            password: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
            passcode: '',
            shared_users: [],
            location: [Object] } ],
       latest_firmware: 
        { id: '57847553a3ec34c9258b4c41',
          version: 'V2.31',
          channel: 2,
          sha1_checksum: '178e7f8303e1aa1617deb63d3d4e7623191c7511',
          public_notes: 'Support for Push-to-Unlock (on Lock hardware that supports it) and Location Services features',
          release_time: 1468298579,
          url: 'https://97fd82753dda7729ce31-e3895cffa4c5dde4cf6f6a3c268ece7b.ssl.cf4.rackcdn.com/V2.315784755363645.hex',
          supported_upgrade_from: 
           [ 'V2.31',
             'V2.30',
             'V2.29',
             'V2.27',
             'V2.25',
             'V2.24',
             'V2.23',
             'V2.28',
             'V2.20',
             'V2.1' ] },
       shared_locks: [] } */
}).catch(err => console.error(err.stack));
```

## Documentation

### LockSmartApiClient(apiKey = LOCKSMART_API_DEFAULT_KEY)

API client constructor. Optionally takes an API key; default is the key the
Android app uses.

### LockSmartApiClient#login(email, password)

Logs into the LockSmart API service. Returns a promise with users data from the
API response. *Call this before using other API methods.*

### LockSmartApiClient#getLocks()

Pulls lock information from the LockSmart API server. Returns a promise.

### LockSmartApiClient#apiKey

The API key used to authenticate with the LockSmart API server.

### LockSmartApiClient#token

The user session token used to authenticate with the LockSmart API server.
Present after logging in. It is unknown whether or not this expires.

### Constants

In addition to `LockSmartApiClient,` thhe following constants are exposed from
the `locksmart-api` module:

- `LOCKSMART_API_DEFUALT_KEY`
- `LOCKSMART_API_BASE_URI`
- `LOCKSMART_API_LOGIN_URI`
- `LOCKSMART_API_GET_LOCKS_URI`

## Development

```
$ npm lint # checks code style and license compatibility
$ npm test # simple test script (requires a LockSmart account)
```

## License

[BSD3](/LICENSE)

