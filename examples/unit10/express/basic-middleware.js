/*
 * Express Middleware Basic

 */

const express = require('express');
const app = express();

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

/*
 * NOTE: Alwayt put middleware before routes handlers
 * Otherwise, routes handlers will overwrite the middleware
 */

app.use(function(req, res, next) {
  console.log('request received.');
  next();
});

app.get('/', function(req, res) {
  res.send('Home');
});
