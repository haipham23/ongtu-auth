/* eslint new-cap: ["error", { "properties": false }] */
const router = require('express').Router();

const accountController = require('./controllers/accountController');
const productController = require('./controllers/productController');
const { version } = require('../package.json');

const route = (app) => {
  router.get('/version', (req, res) => res.json(version));

  /* Accounts */
  router.post('/account/create', accountController.create);
  router.post('/account/login', accountController.login);
  router.post('/account/verify', accountController.verify);

  /* Products */
  router.get('/store/products', productController.getAll);
  router.get('/store/products/toggle/', productController.toggle);
  router.post('/store/products', productController.add);
  router.put('/store/products', productController.update);
  router.delete('/store/products', productController.remove);

  /* General */
  app.use('/api', router);
};

module.exports = route;
