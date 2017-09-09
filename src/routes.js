/* eslint new-cap: ["error", { "properties": false }] */
const router = require('express').Router();

const accountController = require('./controllers/accountController');
const { version } = require('../package.json');

const route = (app, db) => {
  router.get('/version', (req, res) => res.json(version));

  router.post('/account/create', (req, res) =>
    accountController.create(req, res, db));

  router.post('/account/login', (req, res) =>
    accountController.login(req, res, db));

  /* General */
  app.use('/api', router);
};

module.exports = route;
