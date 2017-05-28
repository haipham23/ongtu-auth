import express from 'express';

import accountCreateController from './controllers/account.create';
import accountLoginController from './controllers/account.login';

export default function router(app, db) {
  const router = express.Router();

  router.post('/account/create', (req, res) =>
    accountCreateController.create(req, res, db));

  router.post('/account/login', (req, res) =>
    accountLoginController.login(req, res, db));

  /* General */
  app.use('/api', router);
}
