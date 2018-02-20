# Express Advanced Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests.

### Using Regular Expression in routing path

Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.

If you are not familiar with regular expression, it is one of the most useful expression in programming.

* `[abc]` Matches either an a, b or c character
* `[a-z]` Matches any characters between a and z, including a and z.
* `.` Matches any character other than newline
* `\d` Matches any decimal digit. Equivalent to [0-9].
* `a?` Matches an `a` character or nothing.
* `a+` Matches one or more consecutive `a` characters.
* `a*` Matches zero or more consecutive `a` characters.

This route path will match acd and abcd.

```js
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
```

This route path will match abcd, abxcd, abRANDOMcd, ab123cd, and so on.

```js
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
```

This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.

```js
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
```

### Routing Parameter

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```js
app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params);
});
```

### Request Body

Contains key-value pairs of data submitted in the request body. By default, it is undefined, and is populated when you use body-parsing middleware such as `body-parser`.

The following example shows how to use body-parsing middleware to populate req.body.

```js
const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json

app.post('/users', function(req, res) {
  res.send(req.body);
});
```

### Express Router

Use the `express.Router` class to create modular, mountable route handlers. A `Router` instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

The following example creates twoa routers as a module, loads a middleware function in it, defines some routes, and mounts the router module on two different paths in the main app.

Create a router file named `users.js` in the app directory, with the following content:

```js
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('request for users - Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Users home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About users');
});

module.exports = router;
```

Create another router file named `books.js` in the app directory, with the following content:

```js
const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('request for books - Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Books home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About books');
});

module.exports = router;
```

Then, load these two router modules in the app:

```js
const users = require('./users');
const books = require('./books');

// ...

app.use('/users', users);
app.use('/books', books);
```

The app will now be able to handle requests to `/users`, `/users/about`, `/books` and `/books/about`, as well as call the `timeLog` middleware function that is specific to the individual route.
