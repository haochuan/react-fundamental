const express = require('express');
const app = express();
const users = require('./users');
const books = require('./books');

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.use('/users', users);
app.use('/books', books);
