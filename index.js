const co = require('co');
const rp = require('request-promise-native');

const LOCKSMART_API_DEFAULT_KEY = 'f0753b5844d36234302088a2b3be4c1f';

const LOCKSMART_API_BASE_URI = 'https://locksmart.dogandbonecases.com/api/v2/';
const LOCKSMART_API_LOGIN_URI = 'users/login.json';
const LOCKSMART_API_GET_LOCKS_URI = 'locks/get.json';

// Note: the LockSmart API server is sensitive to GET parameter order!
class LockSmartApiClient {
  constructor (apiKey = LOCKSMART_API_DEFAULT_KEY) {
    this.apiKey = apiKey;
  }

  login (email, password) {
    const self = this;
    return co(function * () {
      const options = {
        json: true,
        method: 'POST',
        uri: LOCKSMART_API_BASE_URI + LOCKSMART_API_LOGIN_URI,
        form: {
          apikey: self.apiKey,
          email: email,
          password: password
        }
      };

      var result = yield rp(options);
      self.token = result.token;
      return result.user;
    });
  }

  getLocks (email, password) {
    const self = this;
    return co(function * () {
      const uri = LOCKSMART_API_BASE_URI + LOCKSMART_API_GET_LOCKS_URI +
                  '?token=' + escape(self.token) +
                  '&firmware_channel=2' +
                  '&apikey=' + escape(self.apiKey);

      const options = {
        json: true,
        method: 'GET',
        uri: uri
      };

      return yield rp(options);
    });
  }
}

exports.LockSmartApiClient = LockSmartApiClient;

exports.LOCKSMART_API_DEFAULT_KEY = LOCKSMART_API_DEFAULT_KEY;

exports.LOCKSMART_API_BASE_URI = LOCKSMART_API_BASE_URI;
exports.LOCKSMART_API_LOGIN_URI = LOCKSMART_API_LOGIN_URI;
exports.LOCKSMART_API_GET_LOCKS_URI = LOCKSMART_API_GET_LOCKS_URI;

