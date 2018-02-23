const mongoose = require('mongoose');
const db = mongoose.connection;
// const Schema = mongoose.Schema;

function init() {
  mongoose.connect('mongodb://127.0.0.1:27017/test');
}
db.once('open', function() {
  console.log('mongodb connected.');
});

// connect to the mongoDB
init();

// the schema is useless so far
// we need to create a model using it
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  created_at: Date,
  updated_at: Date
});

// const User = mongoose.model('User', userSchema);

// -------------------------------------- READ -------------------------------------//
// get all the users
// User.find({}, function(err, users) {
// if (err) throw err;

// // object of all the users
// console.log(users);
// });

// get the user with username haochuan
// User.find({ username: 'haochuan' }, function(err, user) {
// if (err) throw err;
// console.log(user);
// });

// // get a user with ID of 1
// User.findById(1, function(err, user) {
// if (err) throw err;
// // show the one user
// console.log(user);
// });

// // -------------------------------------- CREATE -------------------------------------//
// // Get then update
// // get a user with ID of 1
// User.findById(1, function(err, user) {
// if (err) throw err;

// // change the users location
// user.location = 'uk';

// // save the user
// user.save(function(err) {
// if (err) throw err;

// console.log('User successfully updated!');
// });
// });

// // -------------------------------------- UPDATE -------------------------------------//

// // Find then update
// // find the user haochuan
// // update him to haochuan_new
// User.findOneAndUpdate(
// { username: 'haochuan' },
// { username: 'haochuan_new' },
// function(err, user) {
// if (err) throw err;

// // we have the updated user returned to us
// console.log(user);
// }
// );

// // Find by id and update
// // find the user with id 1
// // update username to haochuan_new
// User.findByIdAndUpdate(1, { username: 'haochuan_new' }, function(err, user) {
// if (err) throw err;

// // we have the updated user returned to us
// console.log(user);
// });

// // get the user haochuan
// User.find({ username: 'haochuan' }, function(err, user) {
// if (err) throw err;

// // delete him
// user.remove(function(err) {
// if (err) throw err;
// console.log('User successfully deleted!');
// });
// });

// // -------------------------------------- DELETE -------------------------------------//
// //
// // Get and then remove
// // get the user haochuan
// User.find({ username: 'haochuan' }, function(err, user) {
// if (err) throw err;

// // delete him
// user.remove(function(err) {
// if (err) throw err;
// console.log('User successfully deleted!');
// });
// });

// // find and remove
// // find the user with username haochuan
// User.findOneAndRemove({ username: 'haochuan' }, function(err) {
// if (err) throw err;

// // we have deleted the user
// console.log('User deleted!');
// });

// // find by id and remove
// // find the user with id 1
// User.findByIdAndRemove(1, function(err) {
// if (err) throw err;

// // we have deleted the user
// console.log('User deleted!');
// });
