var express = require('express');
var router = express.Router();
let events = require('./events')
/* GET home admin page. */

router.use(function (req, res, next) {
  if (!req.session.passport)
    return res.redirect('/login')
  else
    next();
})
router.get('/', function (req, res, next) {
  res.render('admin-index', { user: req.session.passport.user });
});

router.use('/events', events);

module.exports = router;
