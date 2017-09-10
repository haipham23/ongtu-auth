require('dotenv').config();

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sslRedirect = require('heroku-ssl-redirect');
const monk = require('monk');
const getenv = require('getenv');
const cors = require('cors');

const routes = require('./routes');
const logger = require('./utils/logger');

const { SERVER_ERROR } = require('./constants/responses');

const mongoUri = getenv('NODE_ENV') !== 'test' ?
  getenv('MONGO_URI') :
  getenv('MONGO_URI_TEST');

const db = monk(mongoUri);
const port = getenv('PORT') || 8080;
const app = express();

app.use(helmet({ noCache: true }));
app.use(cors());
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

app.listen(port, (err) =>
  logger.info(err ? err : `Server is Running with port ${port}`));

module.exports = app;
