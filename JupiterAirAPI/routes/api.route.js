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
let airline_controller = require('../controllers/airlineController');

// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router