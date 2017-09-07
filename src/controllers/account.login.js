const Account = require('../models/account');
const logger = require('../utils/logger');
const jwt = require('../utils/jwt');
const {
  OK,
  ACCOUNT_NOT_FOUND,
  SERVER_ERROR
} = require('../constants/responses');

/**
 * login
 *
 * @param {object} req
 * @param {object} res
 * @param {object} db
 *
 * @return {object} json response
 */
async function login(req, res, db) {
  const account = new Account(req.body);

  try {
    const collection = db.get('accounts');
    const user = await collection.findOne({ username: account.username });

    if (!user) {
      logger.debug('-- acount login controller: user not found --',
        account.username);

      return res.status(ACCOUNT_NOT_FOUND.status)
        .json(ACCOUNT_NOT_FOUND.message);
    }

    const isMatch = await account.compare(user.password);

    if (!isMatch) {
      logger.debug('-- acount login controller: password not match --',
        account.username);

      return res.status(ACCOUNT_NOT_FOUND.status)
        .json(ACCOUNT_NOT_FOUND.message);
    }

    const token = jwt.generate(account.username);

    return res.status(OK.status)
      .json(token);
  } catch(e) {
    logger.debug('-- acount create controller: uncaught error --', e);

    return res.status(SERVER_ERROR.status)
      .json(SERVER_ERROR.message);
  } finally {
    db.close();
  }
}

module.exports = {
  login
};
