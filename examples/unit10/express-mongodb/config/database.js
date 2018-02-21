const mongoose = require('mongoose');
const db = mongoose.connection;

function init() {
  mongoose.connect('mongodb://127.0.0.1:27017/yourDatabase');
}
db.once('open', function() {
  console.log('mongodb connected.');
});

module.exports = init;
