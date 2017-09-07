require('dotenv').config();

const Account = require('../models/account');

describe('=== prepare ===', () => {
  const mongoURI = process.env.MONGO_URI_TEST;
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
    accounts.insert(validUser, () => setTimeout(() => db.close(done), 1000));
  });
});
