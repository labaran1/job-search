const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
  },
  email: {
    type: String,
    required: [true, 'please provied email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
  },
});

module.exports = mongoose.model('user', userSchema);
