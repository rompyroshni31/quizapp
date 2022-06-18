const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/mern-assignment-app');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'error in connectiing to DB'));


db.once('open', function () {
  console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;