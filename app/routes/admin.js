var express = require('express');
var router = express.Router();
let events = require('./events')
let User = require('../models/User');
let Message = require('../models/Message');
let moment = require('moment');
let _ = require('lodash');
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
router.get('/messages', function (req, res) {
  let active_page = req.query.page || 1;
  let page_size = 5;
  return Promise.all([
    Message.find({})
      .skip((active_page - 1) * page_size)
      .limit(page_size).sort({ created_at: -1 }),
    Message.count()
  ]).then(values => {
    messages = values[0];
    count = values[1];


    let mapped = _.map(messages, function (message) {
      return { name: message.name, created_at: moment(message.created_at).format('DD/MM/YYYY'), email: message.email, body: message.body };
    })

    let total_pages = Math.floor(count / 5) + 1;
    return res.render('admin-messages', {
      messages: mapped,
      pagination: {
        active: active_page,
        total: total_pages,
        previous: active_page > 1 ? parseInt(active_page) - 1 : undefined,
        next: active_page < total_pages ? parseInt(active_page) + 1 : undefined
      }
    })
  })
})

module.exports = router;
