/*
 * Express handling 500

 */

const express = require('express');
const app = express();

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.get('/', function(req, res) {
  throw Error('error');
  res.send('Home');
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).send(err.name);
});
