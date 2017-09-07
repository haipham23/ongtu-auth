/* eslint new-cap: ["error", { "properties": false }] */
const router = require('express').Router();

const accountCreateController = require('./controllers/account.create');
const accountLoginController = require('./controllers/account.login');

const route = (app, db) => {
  router.post('/account/create', (req, res) =>
    accountCreateController.create(req, res, db));

  router.post('/account/login', (req, res) =>
    accountLoginController.login(req, res, db));

  /* General */
  app.use('/api', router);
};

module.exports = route;
