'use strict'
const path = require('path');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/upload'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + file.originalname)
  }
})

const upload = multer({ storage: storage })
const User = require('../models/User');
const Event = require('../models/Event');

/* GET home admin page. */


router.post('/', upload.single('image'), function (req, res, next) {
  let created_event = new Event({
    image_path: req.file.filename,
    created_date: new Date()
  })
  return created_event.save()
    .then(created => res.status(200).json(created))
    .catch(err => res.status(500).json(err));
})

router.get('/', function (req, res, next) {
  return User.findOne({ username: req.session.passport.user })
    .then(user => {
      console.log(user);
      return res.render('admin-events', { user: user })
    })
})
router.get('/new', function (req, res, next) {
  return res.render('admin-new-event');
})


module.exports = router;
