require('dotenv').config();

import express from 'express';
import path from 'path';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import sslRedirect from 'heroku-ssl-redirect';
import monk from 'monk';
import getenv from 'getenv';

import routes from './routes';
import logger from './utils/logger';

import { SERVER_ERROR } from './constants/responses';

const mongoUri = getenv('NODE_ENV') !== 'test' ?
  getenv('MONGO_URI') :
  getenv('MONGO_URI_TEST');

const db = monk(mongoUri);
const port = getenv('PORT') || 8080;
const app = express();

app.use(helmet({ noCache: true }));
app.use(compression());
app.use(sslRedirect());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/healthcheck', require('express-healthcheck')());
app.get('/version', require('version-healthcheck'));

routes(app, db);

app.use((err, req, res, next) => {
  logger.error('--- server error ---', err);

  return res.status(SERVER_ERROR.status)
    .json(SERVER_ERROR.message);
});

app.listen(port, err =>
  logger.info(err ? err : `Server is Running with port ${port}`));

export default app;
