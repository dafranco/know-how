var express = require('express');
var router = express.Router();
let events = require('./events')
let User = require('../models/User');
/* GET home admin page. */

router.use(function (req, res, next) {
  if (!req.session.passport)
    return res.redirect('/login')
  else
    next();
})
router.get('/', function (req, res, next) {
  User.findOne({ username: req.session.passport.user })
    .then(user => {
      return res.render('admin-index', { user: user });
    })

});

router.use('/events', events);

module.exports = router;
