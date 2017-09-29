require('dotenv').config();

const Account = require('../models/account');

describe('=== prepare ===', () => {
  const db = require('../db');

  const accounts = db.get('accounts');
  const products = db.get('products');

  it('should clean accounts collection', (done) => {
    accounts.remove({}, done);
  });

  it('should clean products collection', (done) => {
    products.remove({}, done);
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

  after(() => db.close());
});
