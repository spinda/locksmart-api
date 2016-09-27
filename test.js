const co = require('co');
const prompt = require('prompt-promise');

const lockSmartApi = require('.');

co(function * () {
  console.log(lockSmartApi);

  const client = new lockSmartApi.LockSmartApiClient();

  const email = yield prompt('email: ');
  const password = yield prompt.password('password: ');

  const userData = yield client.login(email, password);
  console.log('user data:', userData);

  const lockInfo = yield client.getLocks();
  console.log('lock info:', lockInfo);
});

