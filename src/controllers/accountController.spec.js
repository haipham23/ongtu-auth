const { expect } = require('chai');
const request = require('supertest');

const app = require('../index');

describe('Account Create Controller', () => {
  const INVALID_ACCOUNT_1 = {};

  const INVALID_ACCOUNT_2 = {
    username: 'user$name2',
    password: 'password2',
    email: 'test@example.com'
  };

  const INVALID_ACCOUNT_3 = {
    username: 't',
    password: 'passw$ord2',
    email: 'test@example.com'
  };

  const INVALID_ACCOUNT_4 = {
    username: 'username2',
    password: 'password2',
    email: 'test@exam$ple'
  };

  const VALID_ACCOUNT = {
    username: 'username',
    password: 'password',
    email: 'test@example.com'
  };

  it('should fail - missing information', (done) => {
    request(app)
      .post('/api/account/create')
      .send(INVALID_ACCOUNT_1)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('INVALID_PROPS');
        done();
      });
  });

  it('should fail - username, password, email do not meet requirements - 1',
    (done) => {
    request(app)
      .post('/api/account/create')
      .send(INVALID_ACCOUNT_2)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('INVALID_PROPS');
        done();
      });
  });

  it('should fail - username, password, email do not meet requirements - 2',
    (done) => {
    request(app)
      .post('/api/account/create')
      .send(INVALID_ACCOUNT_3)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('INVALID_PROPS');
        done();
      });
  });

  it('should fail - username, password, email do not meet requirements - 3',
    (done) => {
    request(app)
      .post('/api/account/create')
      .send(INVALID_ACCOUNT_4)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('INVALID_PROPS');
        done();
      });
  });

  it('should success and create new account', (done) => {
    request(app)
      .post('/api/account/create')
      .send(VALID_ACCOUNT)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        expect(res.body).to.equal('OK');
        done();
      });
  });

  it('should fail - account exists', (done) => {
    request(app)
      .post('/api/account/create')
      .send(VALID_ACCOUNT)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('INVALID_PROPS');
        done();
      });
  });
});


describe('Account Login Controller', () => {
  const INVALID_ACCOUNT_1 = {
    username: 'invalidusername',
    password: 'password1'
  };

  const INVALID_ACCOUNT_2 = {
    username: 'validusername',
    password: 'invalidpassword'
  };

  const VALID_ACCOUNT = {
    username: 'validusername',
    password: 'validpassword'
  };

  it('should fail - invalid username', (done) => {
    request(app)
      .post('/api/account/login')
      .send(INVALID_ACCOUNT_1)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('ACCOUNT_NOT_FOUND');
        done();
      });
  });

  it('should fail - invalid password', (done) => {
    request(app)
      .post('/api/account/login')
      .send(INVALID_ACCOUNT_2)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(400);
        expect(res.body).to.equal('ACCOUNT_NOT_FOUND');
        done();
      });
  });

  it('should success', (done) => {
    request(app)
      .post('/api/account/login')
      .send(VALID_ACCOUNT)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(200);
        expect(res.body).to.be.string;
        done();
      });
  });
});