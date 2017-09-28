const { expect } = require('chai');
const request = require('supertest');
const _ = require('lodash');

const app = require('../index');
const jwt = require('../utils/jwt');

describe('Product Controller', () => {
  const PRODUCT_URL = '/api/store/products';

  describe('add() function', () => {
    const apiKey = jwt.generate('testUser');

    const VALID_ACCOUNT = {
      productName: 'Test Product',
      productDesc: 'This is the test product',
      price: '100',
      discount: '1',
      currency: 'USD'
    };

    const INVALID_ACCOUNT_1 = _.omit(VALID_ACCOUNT, 'productName');
    const INVALID_ACCOUNT_2 = _.omit(VALID_ACCOUNT, 'productDesc');
    const INVALID_ACCOUNT_3 = _.omit(VALID_ACCOUNT, 'price');
    const INVALID_ACCOUNT_4 = _.omit(VALID_ACCOUNT, 'discount');
    const INVALID_ACCOUNT_5 = _.omit(VALID_ACCOUNT, 'currency');

    it('should fail to add - missing apiKey', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .send(VALID_ACCOUNT)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to add - missing productName', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_1, {})
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to add - missing productDesc', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_2)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to add - missing price', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_3)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to add - missing discount', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_4)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to add - missing currency', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_5)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('ADD_PRODUCT_FAILED');
          done();
        });
    });

    it('should succeed', (done) => {
      request(app)
        .post(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(VALID_ACCOUNT)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.deep.equal('OK');
          done();
        });
    });
  });
});
