# Express and Mongodb - CRUD

### Define Models

Models are defined using the Schema interface. The Schema allows you to define the fields stored in each document along with their validation requirements and default values.

Let's create a Schema for our first model `User`:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: String,
  created_at: Date,
  updated_at: Date,
});

// the schema is useless so far
// we need to create a model using it
```

Each key in our code userSchema defines a property in our documents which will be cast to its associated SchemaType. For example, we've defined a property `username` which will be cast to the String SchemaType, as well as it cannot be empty and it has to be the unique value.

Following are all valid Schema Types.

* String
* Number
* Date
* Buffer
* Boolean
* Mixed
* Objectid
* Array

Here is the [link to the official documentation for `SchemaType`](http://mongoosejs.com/docs/schematypes.html), where you can find details for other parameters for a property in the `Schema`.

Then let's the `User` model using the `userSchema`:

```js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  location: String,
  created_at: Date,
  updated_at: Date,
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
```

So now we have our first model `User`, what can we do with the new model?

---

### Create

Suppose we already created the model `User`, we can use the model to:

* Create and save new document based on the model

```js
const haochuan = new User({...})
haochuan.save((err) => console.log(err));
```

**NOTE: we use the word `document` to describe the actual data , and `colletion` to describe a set of data in mongodb. In mysql word, we call them `row` and `table`.**

---

### Run a function before saving

We also want to have a `created_at` variable to know when the record was created, as well as a `update_at` variable to know when the record was updated . We can use the Schema `pre` method to have operations happen before an object is saved.

```js
// on every save, add the date
userSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});
```

---

### Read

* Find all

```js
// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});
```

* Find one

```js
// get the user with username haochuan
User.find({username: 'haochuan'}, function(err, user) {
  if (err) throw err;

  console.log(user);
});
```

* Find by ID

```js
// get a user with ID of 1
User.findById(1, function(err, user) {
  if (err) throw err;

  // show the one user
  console.log(user);
});
```

---

### Update

* Get and then update

```js
// get a user with ID of 1
User.findById(1, function(err, user) {
  if (err) throw err;

  // change the users location
  user.location = 'uk';

  // save the user
  user.save(function(err) {
    if (err) throw err;

    console.log('User successfully updated!');
  });
});
```

* Find and then update

```js
// find the user haochuan
// update him to haochuan_new
User.findOneAndUpdate(
  {username: 'haochuan'},
  {username: 'haochuan_new'},
  function(err, user) {
    if (err) throw err;

    // we have the updated user returned to us
    console.log(user);
  },
);
```

* Find by id and update

```js
// find the user with id 1
// update username to haochuan_new
User.findByIdAndUpdate(1, {username: 'haochuan_new'}, function(err, user) {
  if (err) throw err;

  // we have the updated user returned to us
  console.log(user);
});
```

---

### Delete

* Get then remove

```js
// get the user haochuan
User.find({username: 'haochuan'}, function(err, user) {
  if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) throw err;
    console.log('User successfully deleted!');
  });
});
```

* Find then remove

```js
// find the user with username haochuan
User.findOneAndRemove({username: 'haochuan'}, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
```

* Get then remove

```js
// find the user with id 1
User.findByIdAndRemove(1, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
```
