### Express Middleware

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Middleware functions can perform the following tasks:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

* Application-level middleware
* Router-level middleware
* Error-handling middleware
* Built-in middleware
* Third-party middleware

##### Example - Application-level - Log middleware

```js
app.use(function(req, res, next) {
  console.log('request received.');
  next();
});
```

You can also apply application-level middleware to an individual route.

```js
app.use('/user', function(req, res, next) {
  console.log('request received.');
  next();
});

app.get('/user', function(req, res) {
  res.send('Hello World.');
});
```

Or combine the middleware and handler function together for a route.

```js
app.get(
  '/user',
  function(req, res, next) {
    console.log('request received.');
    next();
  },
  function(req, res) {
    res.send('Hello World.');
  },
);
```

##### Example - Application-level - Authentication middleare

```js
app.use(function(req, res, next) {
  if (req.isAuthenticated) {
    next();
  } else {
    res.redirect('/login');
  }
});
```

##### Example - Router-level - Time log

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

##### Example - Error Handling

You define error-handling middleware in the same way as other middleware, except with four arguments instead of three; specifically with the signature (err, req, res, next):

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

##### Example - Built-in - Serving static files

```js
app.use('/static', express.static(path.join(__dirname, 'public')));
```
