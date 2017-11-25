const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  readable_name: String,
  username: { type: String, unique: true },
  password: String,
  active: Boolean
});

User.plugin(passportLocalMongoose, {
  findByUsername: function (model, queryParameters) {
    // Add additional query parameter - AND condition - active: true
    queryParameters.active = true;
    return model.findOne(queryParameters);
  }
});

module.exports = mongoose.model('User', User);