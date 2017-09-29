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
      owner: owner,
      isActive: true
    }, {
      fields: {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        isActive: 0
      }
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

  await db
    .get(PRODUCTS_COLLECTION)
    .findOneAndUpdate(
      {
        ower: product.owner,
        productId: product.productId
      },
      product
    );

  db.close();

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

  db.close();

  return OK;
}


module.exports = {
  add,
  get,
  update,
  remove
};
