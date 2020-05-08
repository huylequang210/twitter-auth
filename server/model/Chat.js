const mongoose = require('mongoose');

const models = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Chat = mongoose.model('chat', models);

module.exports = Chat;