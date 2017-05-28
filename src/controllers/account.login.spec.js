import { expect } from 'chai';
import request from 'supertest';

import app from '../index';

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

  it('should fail - invalid username', done => {
    request(app)
      .post('/api/account/login')
      .send(INVALID_ACCOUNT_1)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(404);
        expect(res.body).to.equal('ACCOUNT_NOT_FOUND');
        done();
      });
  });

  it('should fail - invalid password', done => {
    request(app)
      .post('/api/account/login')
      .send(INVALID_ACCOUNT_2)
      .end((err, res) => {
        expect(err).to.not.exist;
        expect(res.status).to.equal(404);
        expect(res.body).to.equal('ACCOUNT_NOT_FOUND');
        done();
      });
  });

  it('should success', done => {
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
