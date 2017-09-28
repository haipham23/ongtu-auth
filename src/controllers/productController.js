const accountServices = require('../services/accountServices');
const productServices = require('../services/productServices');

const {
  ADD_PRODUCT_FAILED,
  NO_PRODUCT,
  UPDATE_PRODUCT_FAILED,
  REMOVE_PRODUCT_FAILED
} = require('../constants/responses');

/**
 * add product
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function add(req, res, db) {
  accountServices
    .getUsername(req.headers['x-api-key'])
    .then((owner) => {
      const body = Object.assign(
        {},
        req.body,
        { owner }
      );

      return productServices.add(body, db);
    })
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(ADD_PRODUCT_FAILED));
}


/**
 * get all products by owner
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function getAll(req, res, db) {
  accountServices
    .getUsername(req.headers['x-api-key'])
    .then((owner) => productServices.get(owner, db))
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(NO_PRODUCT));
}


/**
 * update product
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function update(req, res, db) {
  accountServices
    .getUsername(req.headers['x-api-key'])
    .then((owner) => {
      const body = Object.assign(
        {},
        req.body,
        { owner }
      );

      return productServices.update(body, db);
    })
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(UPDATE_PRODUCT_FAILED));
}


/**
 * remove product
 * @param {object} req request object
 * @param {object} res response object
 * @param {object} db database object
 */
function remove(req, res, db) {
  accountServices
    .getUsername(req.headers['x-api-key'])
    .then((owner) => {
      const body = Object.assign(
        {},
        req.body,
        { owner }
      );

      return productServices.remove(body, db);
    })
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(REMOVE_PRODUCT_FAILED));
}

module.exports = {
  add,
  getAll,
  update,
  remove
};
