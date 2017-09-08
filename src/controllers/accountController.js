const accountServices = require('../services/accountServices');


/**
 * create account
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function create(req, res, db) {
  accountServices
    .create(req.body, db)
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error.message));
}


/**
 * login
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function login(req, res, db) {
  accountServices
    .login(req.body, db)
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error.message));
}


module.exports = {
  create,
  login
};
