const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const env = require('./config/env');
const routes = require('./routes');

const app = express();

/*==================================
=            Middleware            =
==================================*/
app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(compression());
app.use(logger('tiny'));
app.use(bodyParser.json());

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/

/*===========================
=            Routes            =
===========================*/

app.use('/users', routes.users);
app.use('/books', routes.books);

/*=====  End of Routes  ======*/

module.exports = app;
