require('dotenv').config();

const getenv = require('getenv');

const Account = require('../models/account');

describe('=== prepare ===', () => {
  const mongoURI = getenv('MONGO_URI_TEST');
  const db = require('monk')(mongoURI);
  const accounts = db.get('accounts');

  it('should clean db', (done) => {
    accounts.remove({}, done);
  });

  it('should initialize db', (done) => {
    const account = new Account({
      username: 'validusername',
      password: 'validpassword',
      email: 'valid.email@example.com'
    });

    const validUser = account.create();

    accounts
      .insert(validUser)
      .then(() => db.close(done));
  });
});
