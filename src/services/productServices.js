const Product = require('../models/Product');

const {
  OK,
  INVALID_PROPS
} = require('../constants/responses');

const PRODUCTS_COLLECTION = 'products';


/**
 * add new product
 * @param {object} body request body
 * @param {object} db database object
 *
 * @return {object} json response
 */
async function add(body, db) {
  const collection = db.get(PRODUCTS_COLLECTION);
  const product = new Product(body);

  if (!product.isValid()) {
    throw new Error(INVALID_PROPS);
  }

  await collection.insert(product.get());

  return OK;
}


/**
 * get all products
 * @param {object} owner the owner of product
 * @param {object} db database object
 *
 * @return {object} json response
 */
async function get(owner, db) {
  const products = await db
    .get(PRODUCTS_COLLECTION)
    .find({
      owner: owner
    }, {
      _id: -1
    })
    .toArray();

  return products;
}


/**
 * update
 *
 * @param {object} body
 * @param {object} db
 *
 * @return {object} json response
 */
async function update(body, db) {
  const product = new Product(body);

  await db
    .get(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      {
        ower: product.owner,
        productId: product.productId
      },
      product
    );

  return OK;
}


/**
 * remove
 *
 * @param {object} body
 * @param {object} db
 *
 * @return {object} json response
 */
async function remove(body, db) {
  const product = new Product(body);

  await db
    .get(PRODUCTS_COLLECTION)
    .findOneAndUpdate({
        owner: product.owner,
        productId: product.productId
      }, {
        isActive: false
      }
    );

  return OK;
}


module.exports = {
  add,
  get,
  update,
  remove
};
