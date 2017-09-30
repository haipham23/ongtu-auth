require('dotenv').config();

const Account = require('../models/account');
const Product = require('../models/product');

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
      .then((account) => {
        global.TEST_ACCOUNT = account;

        done();
      });
  });

  it('should init products collection', (done) => {
    const product = new Product({
      productName: 'valid product',
      productDesc: 'This is the valid product',
      price: '200',
      discount: '5',
      currency: 'USD',
      owner: 'testUser'
    });

    const validProduct = product.get();

    products
      .insert(validProduct)
      .then((product) => {
        global.TEST_PRODUCT = product;

        done();
      });
  });

  after(() => db.close());
});
