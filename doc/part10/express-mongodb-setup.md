# Mongodb and Express - Setup

### Adding Database to Express

Adding the capability to connect databases to Express apps is just a matter of loading an appropriate Node.js driver for the database in your app. This document briefly explains how to add and use some of the most popular Node.js modules for database systems in your Express app: [link](https://expressjs.com/en/guide/database-integration.html);

---

### Two ways to interact with Database

* Using the databases' native query language (e.g. SQL)
* Using an Object Data Model ("ODM") / Object Relational Model ("ORM"). An ODM/ORM represents the website's data as JavaScript objects, which are then mapped to the underlying database.

```js
connection.query('SELECT * FROM Users Where userId = ?', [10], function(
  err,
  rows,
) {
  if (err) throw err;
  console.log(rows);
});
```

```js
Users.find({id: 10}, (err, user) => console.log(user));
```

The very best performance can be gained by using SQL, or whatever query language is supported by the database. ODM's are often slower because they use translation code to map between objects and the database format, which may not use the most efficient database queries (this is particularly true if the ODM supports different database backends, and must make greater compromises in terms of what database features are supported).

The benefit of using an ORM is that programmers can continue to think in terms of JavaScript objects rather than database semantics — this is particularly true if you need to work with different databases (on either the same or different websites). They also provide an obvious place to perform validation and checking of data.

---

### What is CRUD

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (POST, GET, PUT and DELETE respectively). This is what each operation does:

* Create (POST) - Make something
* Read (GET)\_- Get something
* Update (PUT) - Change something
* Delete (DELETE)- Remove something

---

### Get Started with Mongoose

* Node.js and MongoDB are a pair made for each other. Being able to use JSON across the board and JavaScript makes development very easy.
* Mongoose is an object modeling package for Node that essentially works like an ORM.
* Mongoose allows us to have access to the MongoDB commands for CRUD simply and easily.

---

### Adding Mongoose to Express Application

First of all, you need install Mongoose in your project (package.json) like any other dependency — using NPM. To install it, use the following command inside your project folder:

```
npm install mongoose --save
```

**NOTE: Installing Mongoose adds all its dependencies, including the MongoDB database driver, but it does not install MongoDB itself. If you want to install a MongoDB server then you can download installers from [ here ](https://docs.mongodb.com/manual/administration/install-community/) for various operating systems and install it locally. You can also use cloud-based MongoDB instances.**

Then you need to setup the connection for the mongodb using mongoose in your project, see `/config/database.js` as below:

```js
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/yourDatabase');
db.once('open', function() {
  console.log('mongodb connected.');
});
```

**NOTE: In order to run setup the connect from your express app to mongodb, you have to run the mongodb in your local first by `mongod`, then you will see something like `waiting for connections on port 27017` in your terminal, which means mongodb is up and running in your local machine. If you prefer using a cloud mongodb host, [mLab](https://mlab.com/) is one of the most popular cloud database service and you have the option to get the Sandbox Plan for free.**
