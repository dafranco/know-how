var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/', passport.authenticate('local'), function (req, res) {
  res.redirect('admin');
});

module.exports = router;
