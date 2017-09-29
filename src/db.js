const monk = require('monk');
const getenv = require('getenv');

// istanbul ignore next
const mongoUri = getenv('NODE_ENV') !== 'test' ?
  getenv('MONGO_URI') :
  getenv('MONGO_URI_TEST');

const db = monk(mongoUri);

// create mongo index
// const products = db.get('products');
// products.createIndex('productId');

module.exports = db;
