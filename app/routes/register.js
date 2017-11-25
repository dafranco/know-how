const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', function (req, res, next) {
  return res.render('register');
})

router.post('/', function (req, res, next) {
  User.register(new User({ username: req.body.username, readable_name: req.body.readable_name, active: false }), req.body.password, function (err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    res.redirect('/session');
  });
})
module.exports = router;