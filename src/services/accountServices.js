const db = require('../db');
const Account = require('../models/account');
const jwt = require('../utils/jwt');
const {
  OK,
  INVALID_PROPS,
  ACCOUNT_NOT_FOUND
} = require('../constants/responses');

const ACCOUNT_COLLECTION = 'accounts';


/**
 * create account
 * @param {object} body request body
 *
 * @return {object} json response
 */
async function create(body) {
  const account = new Account(body);

  if (!account.isValid()) {
    throw new Error(INVALID_PROPS);
  }

  const collection = db.get(ACCOUNT_COLLECTION);
  const isExisting = (await collection.find({
    $or: [{
      username: account.username
    }, {
      email: account.email
    }]
  })).length > 0;

  if (isExisting) {
    throw new Error(INVALID_PROPS);
  }

  await collection.insert(account.create());

  db.close();

  return OK;
}


/**
 * login
 *
 * @param {object} body
 *
 * @return {object} json response
 */
async function login(body) {
  const account = new Account(body);
  const collection = db.get(ACCOUNT_COLLECTION);
  const user = await collection.findOne({
    username: account.username
  }, {
    fields: { username: 1, password: 1 }
  });

  db.close();

  if (!user) {
    throw new Error(ACCOUNT_NOT_FOUND);
  }

  const isMatch = await account.compare(user.password);

  if (!isMatch) {
    throw new Error(ACCOUNT_NOT_FOUND);
  }

  return jwt.generate(account.username);
}


/**
 * verify
 *
 * @param {string} body
 *
 * @return {Promise} username
 */
function verify(body) {
  return new Promise((resolve, reject) => {
    const { token, username } = body;

    if (
      !token ||
      !username ||
      username !== jwt.verify(token)) {
      return reject();
    }

    resolve(OK);
  });
}

/**
 * getUsername
 *
 * @param {string} token
 *
 * @return {string} username
 */
function getUsername(token) {
  return new Promise((resolve, reject) => {
    const username = jwt.verify(token);

    if (!username) {
      return reject('Invalid Token');
    }

    return resolve(username);
  });
}


module.exports = {
  create,
  login,
  verify,
  getUsername
};
