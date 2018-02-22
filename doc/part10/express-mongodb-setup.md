# Mongodb and Express - Setup

### Why use MongoDB/Mongoose

* Node.js and MongoDB are a pair made for each other. Being able to use JSON across the board and JavaScript makes development very easy.
* Mongoose is an object modeling package for Node that essentially works like an ORM.
* Mongoose allows us to have access to the MongoDB commands for CRUD simply and easily.

---

### Adding Mongoose to Express Application

MongoDB provide native driver for Node.js called “mongodb” which you can use to connect to MongoDB and perform various CRUD operation. There is another more popular MongoDB recommended node module called “mongoose” and this one we are going to use.

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

---

### CRUD And RestFul API

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (POST, GET, PUT and DELETE respectively). This is what each operation does:

* Create (POST) - Make something
* Read (GET)\_- Get something
* Update (PUT) - Change something
* Delete (DELETE)- Remove something

---
