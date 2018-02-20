/*
 * Store and Pass values in middleware
 * store values in Object res.locals
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
  console.log(`request received at ${req.url}`);
  console.log(res.locals);
  res.locals.url = req.url;
  next();
});

app.get('/', function(req, res) {
  console.log(res.locals);
  res.send('Home');
});
