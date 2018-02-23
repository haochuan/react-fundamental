const express = require('express');
const path = require('path');

const env = require('./config/env');
const routes = require('./routes');

const app = express();

/*==================================
=            Middleware            =
==================================*/

// serve static files
app.use('/static', express.static(path.join(__dirname, 'public', 'static')));

/*=====  End of Middleware  ======*/

/*===========================
=            Routes            =
===========================*/

app.use('/files', routes.files);

/*=====  End of Routes  ======*/

module.exports = app;
