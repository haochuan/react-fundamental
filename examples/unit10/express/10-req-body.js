/*
 * Express request body

 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.post('/users', function(req, res) {
  res.send(req.body);
});
