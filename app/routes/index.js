var express = require('express');
var router = express.Router();
const users = require('./users');
const login = require('./login');
const register = require('./register');
const admin = require('./admin');
const Event = require('../models/Event');
/* GET home page. */
router.get('/', function (req, res, next) {
  return Event.find({}).sort({ created_date: -1 }).limit(3)
    .then(events => {
      events.forEach(event => event.image_path = '/upload/' + event.image_path)
      return res.render('index', { title: 'Express', events: events });
    })

});
router.get('/prueba', function(req,res,next){
  return Event.find({}).sort({ created_date: -1 }).limit(3)
    .then(events => {
      events.forEach(event => event.image_path = '/upload/' + event.image_path)
      events = undefined;
      return res.render('index-new', { title: 'Express', events: events });
    })
  
})
router.use('/users', users);
router.use('/login', login);
router.use('/register', register)
router.use('/admin', admin);

router.get('/session', function (req, res) {
  return res.json(req.session);
})


// catch 404 and forward to error handler
router.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
