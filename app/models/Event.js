const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
  created_date: { type: Date, defaultsTo: new Date() },
  creation_user: Schema.Types.Mixed,
  link: String,
  image_path: String
});

module.exports = mongoose.model('Event', Event);