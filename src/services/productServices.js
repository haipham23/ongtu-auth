const db = require('../db');
const Product = require('../models/product');

const {
  OK,
  INVALID_PROPS
} = require('../constants/responses');

const PRODUCTS_COLLECTION = 'products';


/**
 * add new product
 * @param {object} body request body
 *
 * @return {object} json response
 */
async function add(body) {
  const collection = db.get(PRODUCTS_COLLECTION);
  const product = new Product(body);

  if (!product.isValid()) {
    throw new Error(INVALID_PROPS);
  }

  await collection.insert(product.get());

  db.close();

  return OK;
}


/**
 * get all products
 * @param {object} owner the owner of product
 * @param {object} db database object
 *
 * @return {object} json response
 */
async function get(owner) {
  const products = await db
    .get(PRODUCTS_COLLECTION)
    .find({
      owner: owner
    }, {
      fields: {
        _id: 0,
        createdAt: 0,
        owner: 0
      },
      limit: 20
    });

  db.close();

  return products;
}


/**
 * update
 *
 * @param {object} body
 *
 * @return {object} json response
 */
async function update(body) {
  const product = new Product(body);

  if (!product.isValid()) {
    throw new Error(INVALID_PROPS);
  }

  const productObj = product.get();

  await db
    .get(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      {
        owner: productObj.owner,
        productId: productObj.productId
      },
      productObj
    );

  db.close();

  return OK;
}


/**
 * toggle
 *
 * @param {object} body
 *
 * @return {object} json response
 */
async function toggle(body) {
  if (!body.productId) {
    throw new Error(INVALID_PROPS);
  }

  const product = new Product(body);
  const { owner, productId, isActive } = product.get();

  const result = await db
    .get(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      {
        owner: owner,
        productId: productId
      }, {
        $set: {
          isActive: !!isActive
        }
      }
    );

  db.close();

  if (result.lastErrorObject) {
    throw new Error(INVALID_PROPS);
  }

  return OK;
}


/**
 * remove
 *
 * @param {object} body
 *
 * @return {object} json response
 */
async function remove(body) {
  if (!body.productId) {
    throw new Error(INVALID_PROPS);
  }

  const product = new Product(body);

  const result = await db
    .get(PRODUCTS_COLLECTION)
    .remove({
      owner: product.owner,
      productId: product.productId
    });

  db.close();

  // result.result.n is the number of object deleted
  if (result.result.n < 1) {
    throw new Error(INVALID_PROPS);
  }

  return OK;
}


module.exports = {
  add,
  get,
  update,
  toggle,
  remove
};
