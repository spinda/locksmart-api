const co = require('co');
const prompt = require('prompt-promise');

const { LockSmartApiClient } = require('.');

co(function * () {
  const client = new LockSmartApiClient();

  const email = yield prompt('email: ');
  const password = yield prompt.password('password: ');

  const userData = yield client.login(email, password);
  console.log('user data:', userData);

  const lockInfo = yield client.getLocks();
  console.log('lock info:', lockInfo);
});

