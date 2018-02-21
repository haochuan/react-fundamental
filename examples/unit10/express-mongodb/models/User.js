const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create user schema
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: String,
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
const User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
