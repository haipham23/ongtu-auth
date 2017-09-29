const _ = require('lodash');
const Ajv = require('ajv');

const schema = require('./product.json');
const logger = require('../utils/logger');
const { generateId } = require('../utils/generator');

const ajv = new Ajv();
const validate = ajv.compile(schema);

const Product = class Product {
  /**
   * constructor
   *
   * @param {object} o initital object
   */
  constructor(o) {
    if (o) {
      this.productName = _.trim(o.productName);
      this.productId = o.productId || generateId(this.productName);
      this.productDesc = _.trim(escape(o.productDesc));
      this.owner = o.owner;
      this.price = _.trim(o.price);
      this.discount = _.trim(o.discount);
      this.currency = _.trim(o.currency);
      this.isActive = true;
      this.createdAt = +new Date();
      this.updatedAt = +new Date();
    }
  }

  /**
   * check if object is valid
   *
   * @return {bool} object is valid
   */
  isValid() {
    const valid = validate(this);

    if (!valid) {
      logger.debug('-- product model: --', validate.errors);
    }

    return valid;
  }

  /**
   * add new product
   *
   * @return {object} product
   */
  get() {
    return this;
  }
};

module.exports = Product;
