const express = require('express');
const router = express.Router();
const config = require('config')
var jwt = require('express-jwt');

var auth = jwt({
  secret: config.get('secret_key'),
  userProperty: 'payload'
});
// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log(new Date(), 'API:', req.url)
  next()
});


//controller modules
let ctrlAuth = require('../controllers/authentication');
let airline_controller = require('../controllers/airline');

// define the home page route
router.get('/admin', auth, function (req, res) {
  res.send('Airlines home page')
})
// define the airline route
router.get('/airline', function (req, res) {
  console.log(req.body);
  res.send('About airlines')
})

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;