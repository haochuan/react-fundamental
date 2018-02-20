/*
 * Express Basic Routing
 * Routing refers to determining how an application responds to a client request 
 * to a particular endpoint, which is a URI (or path) and 
 * a specific HTTP request method (GET, POST, and so on).
 * 
 * Each route can have one or more handler functions, 
 * which are executed when the route is matched.
 * 
 * Route definition takes the following structure:
 * app.METHOD(PATH, HANDLER);
 */
const express = require('express');
const app = express();

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.post('/', function(req, res) {
  res.send('Got a POST request');
});

app.put('/user', function(req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function(req, res) {
  res.send('Got a DELETE request at /user');
});
