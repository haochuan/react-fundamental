# Express.js Basic

### What is express.js

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.

Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.

### Installation

* Install Node.js and npm first
* Use the npm init command to create a package.json file for your application.

```js
npm init -y
```

* Now install Express in your project and save it in the dependencies list.

```js
npm isntall express --save
```

### Hello World

This app starts a server and listens on port 3000 for connections. The app responds with “Hello World!” for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.

Create an `index.js` file in your project directory:

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
```

Use the following commmand to run your application locally:

```js
node index.js
```

### Basic Routing

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

Route definition takes the following structure:

```js
app.METHOD(PATH, HANDLER);
```

* app is an instance of express.
* METHOD is an HTTP request method, in lowercase.
* PATH is a path on the server.
* HANDLER is the function executed when the route is matched.

#### Examples

Respond with Hello World! on the homepage:

```js
app.get('/', function(req, res) {
  res.send('Hello World!');
});
```

Respond to POST request on the root route (/), the application’s home page:

```js
app.post('/', function(req, res) {
  res.send('Got a POST request');
});
```

Respond to a PUT request to the /user route:

```js
app.put('/user', function(req, res) {
  res.send('Got a PUT request at /user');
});
```

Respond to a DELETE request to the /user route:

```js
app.delete('/user', function(req, res) {
  res.send('Got a DELETE request at /user');
});
```

Respond to all METHOD to the /user route:

```js
app.all('/user', function(req, res) {
  res.send('Got a request at /user');
});
```

#### [More detail about HTTP request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)

* GET: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.

* POST: The POST method is used to submit an entity to the specified resource, often causing a change in state or side effects on the server

* PUT: The PUT method replaces all current representations of the target resource with the request payload.

* DELETE: The DELETE method deletes the specified resource.

### Serving static files

To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.

The function signature is:

```js
express.static(root, [options]);
```

The root argument specifies the root directory from which to serve static assets

For example, use the following code to serve images, CSS files, and JavaScript files in a directory named public:

```js
app.use(express.static('public'));
```

To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the express.static function, specify a mount path for the static directory, as shown below:

```js
app.use('/static', express.static('public'));
```

**Important**: However, the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve, or it will break if you start your app from another directory.

```js
const path = require('path');
...
app.use('/static', express.static(path.join(__dirname, 'public')));
...
```

### Handling 404

In Express, 404 responses are not the result of an error, so the error-handler middleware will not capture them. This behavior is because a 404 response simply indicates the absence of additional work to do; in other words, Express has executed all middleware functions and routes, and found that none of them responded. All you need to do is add a middleware function at the very bottom of the stack (below all other functions) to handle a 404 response:

```js
app.use(function(req, res, next) {
  res.status(404).send("Sorry can't find that!");
});
```

### Handling 500 error

You define error-handling middleware in the same way as other middleware, except with four arguments instead of three; specifically with the signature (err, req, res, next):

```js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
