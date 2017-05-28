import Account from './account';
import { expect } from 'chai';

describe('Account model', () => {
  it('should fail to create account - invalid username', () => {
    const account1 = new Account({
      password: 'testPassword',
      email: 'test@example.com'
    });

    const account2 = new Account({
      username: 't',
      password: 'testPassword',
      email: 'test@example.com'
    });

    const account3 = new Account({
      username: 'testUsernamethathastomanycharssssssssssssss',
      password: 'testPassword',
      email: 'test@example.com'
    });

    const account4 = new Account({
      username: 'testU$e3Nam&',
      password: 'testPassword',
      email: 'test@example.com'
    });

    expect(account1.isValid()).to.be.false;
    expect(account2.isValid()).to.be.false;
    expect(account3.isValid()).to.be.false;
    expect(account4.isValid()).to.be.false;
  });

  it('should fail to create account - invalid password', () => {
    const account = new Account({
      username: 'testUsername',
      email: 'test@example.com'
    });

    const account2 = new Account({
      username: 'testUsername',
      password: 't',
      email: 'test@example.com'
    });

    const account3 = new Account({
      username: 'testUsername',
      password: 'testPasswordthathastomanycharssssssssssssss',
      email: 'test@example.com'
    });

    expect(account.isValid()).to.be.false;
    expect(account2.isValid()).to.be.false;
    expect(account3.isValid()).to.be.false;
  });

  it('should fail to create account - invalid email', () => {
    const account2 = new Account({
      username: 'testUsername',
      password: 'testPassword',
      email: 'testEmail'
    });

    const account3 = new Account({
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@example$com'
    });

    expect(account2.isValid()).to.be.false;
    expect(account3.isValid()).to.be.false;
  });

  it('should create an account', () => {
    const account = new Account({
      username: 'testUsername',
      password: 'testPassword',
      email: 'test@example.com'
    });

    const account2 = new Account({
      username: '              testUsername                        ',
      password: '              testPassword                        ',
      email: '              test@example.com                        '
    });

    const account3 = new Account({
      username: 'testUsername',
      password: 'testPassword',
      oldPassword: 'oldPassword',
      email: 'test@example.com'
    });

    expect(account.isValid()).to.be.true;
    expect(account2.isValid()).to.be.true;
    expect(account3.isValid()).to.be.true;
  });
});
