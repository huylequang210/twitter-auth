const mongoose = require('mongoose');

const models = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('user', models);

module.exports = User;