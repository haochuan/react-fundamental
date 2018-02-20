/*
 * Express Routing Regular Expression

 */

const express = require('express');
const app = express();

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.get(/.*info$/, function(req, res) {
  res.send(`You sent a request at ${req.url}.`);
});
