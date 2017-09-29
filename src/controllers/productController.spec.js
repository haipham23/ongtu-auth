const { expect } = require('chai');
const request = require('supertest');
const _ = require('lodash');

const app = require('../index');
const jwt = require('../utils/jwt');
const productServices = require('../services/productServices');

describe('Product Controller', () => {
  const PRODUCT_URL = '/api/store/products';
  const apiKey = jwt.generate('testUser');

  describe('add() function', () => {
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
          expect(res.body).to.equal('OK');
          done();
        });
    });
  });


  describe('getAll() function', () => {
    it('should fail to get - missing api-key', (done) => {
      request(app)
        .get(PRODUCT_URL)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('NO_PRODUCT');
          done();
        });
    });

    it('should succeed', (done) => {
      request(app)
        .get(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an.instanceof(Array);
          done();
        });
    });
  });


  describe('update() function', () => {
    let productId;
    let VALID_PRODUCT;
    let INVALID_ACCOUNT_1;
    let INVALID_ACCOUNT_2;
    let INVALID_ACCOUNT_3;
    let INVALID_ACCOUNT_4;
    let INVALID_ACCOUNT_5;

    before((done) => {
      productServices
        .get('testUser')
        .then((products) => {
          productId =
            products
              .filter((p) => p.productName === 'valid product')[0]
              .productId;

          expect(productId).to.be.a.string;

          VALID_PRODUCT = {
            productName: 'updated product',
            productId: productId,
            productDesc: 'This is the test product update',
            price: '200',
            discount: '5',
            currency: 'USD'
          };

          INVALID_ACCOUNT_1 = _.omit(VALID_PRODUCT, 'productName');
          INVALID_ACCOUNT_2 = _.omit(VALID_PRODUCT, 'productDesc');
          INVALID_ACCOUNT_3 = _.omit(VALID_PRODUCT, 'price');
          INVALID_ACCOUNT_4 = _.omit(VALID_PRODUCT, 'discount');
          INVALID_ACCOUNT_5 = _.omit(VALID_PRODUCT, 'currency');

          done();
        });
    });


    it('should fail to update - missing apiKey', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .send(VALID_PRODUCT)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to update - missing productName', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_1, {})
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to update - missing productDesc', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_2)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to update - missing price', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_3)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to update - missing discount', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_4)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should fail to update - missing currency', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(INVALID_ACCOUNT_5)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(400);
          expect(res.body).to.equal('UPDATE_PRODUCT_FAILED');
          done();
        });
    });

    it('should succeed', (done) => {
      request(app)
        .put(PRODUCT_URL)
        .set('x-api-key', apiKey)
        .send(VALID_PRODUCT)
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).to.equal(200);
          expect(res.body).to.equal('OK');
          done();
        });
    });


    after((done) => {
      productServices
        .get('testUser')
        .then((products) => {
          const productName =
            products
              .filter((p) => p.productId === productId)[0]
              .productName;

          expect(productName).to.equal('updated product');

          done();
        });
    });
  });
});
