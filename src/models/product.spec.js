const Product = require('./product');
const { expect } = require('chai');

describe('Product model', () => {
  it('should fail to create new product - missing productName', () => {
    const product = new Product();

    expect(product.isValid()).to.be.false;
  });

  it('should fail to create new product - missing productName', () => {
    const product = new Product({
      productName: 'product test name',
      productDesc: 'product test desc'
    });

    expect(product.isValid()).to.be.false;
  });

  it('should create new product', () => {
    const product = new Product({
      productName: 'product test name',
      productDesc: 'product test desc',
      owner: 'testUser',
      price: '1000.00',
      discount: '0.00',
      currency: 'USD'
    });

    expect(product.isValid()).to.be.true;
  });

  it('should get product details', () => {
    const product = new Product({
      productName: 'product test name',
      productDesc: '<h1>product</h1> test desc',
      price: '1000.00',
      discount: '0.00',
      currency: 'USD',
      owner: 'testUser'
    });

    expect(product.get()).to.have.all.keys(
      'productName',
      'productId',
      'owner',
      'productDesc',
      'price',
      'isActive',
      'createdAt',
      'updatedAt',
      'currency',
      'discount'
    );
  });
});
