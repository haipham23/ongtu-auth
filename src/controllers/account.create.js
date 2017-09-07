const Account = require('../models/account');
const logger = require('../utils/logger');
const {
  OK,
  INVALID_PROPS,
  SERVER_ERROR
} = require('../constants/responses');

/**
 * create account
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 *
 * @return {object} json response
 */
async function create(req, res, db) {
  const account = new Account(req.body);

  if (!account.isValid()) {
    logger.debug('-- acount create controller: invalid info --',
      account.username, account.email);

    return res.status(INVALID_PROPS.status)
      .json(INVALID_PROPS.message);
  }

  try {
    const collection = db.get('accounts');
    const isExisting = (await collection.find({
      $or: [{
        username: account.username
      }, {
        email: account.email
      }]
    })).length > 0;

    if (isExisting) {
      logger.debug('-- acount create controller: username or email exist --',
        account.username, account.email);

      return res.status(INVALID_PROPS.status)
        .json(INVALID_PROPS.message);
    }

    const result = (await collection.insert(account.create()));

    if (result) {
      return res.status(OK.status)
        .json(OK.message);
    } else {
      logger.debug('-- acount create controller: cant create account --');

      return res.status(SERVER_ERROR.status)
        .json(SERVER_ERROR.message);
    }
  } catch(e) {
    logger.debug('-- acount create controller: uncaught error --', e);

    return res.status(SERVER_ERROR.status)
      .json(SERVER_ERROR.message);
  } finally {
    db.close();
  }
}

module.exports = {
  create
};
