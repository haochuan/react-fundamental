/*
 * Express serve static files
 * To serve static files such as images, CSS files, 
 * and JavaScript files, use the express.static 
 * built-in middleware function in Express.
 */

const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, function(req, res) {
  console.log('Express App is listening on port 3000');
});

app.use(express.static('public'));
// app.use('/static', express.static('public'));
// Use absolute path
// If you run the app from other location
// rather than the 'project root',
// you have to use path.join();
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/static', express.static(path.join(__dirname, 'public')));
