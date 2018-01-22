const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
  created_at: { type: Date, default: new Date() },
  name: String,
  email: String,
  body: String
});

module.exports = mongoose.model('Message', Message);