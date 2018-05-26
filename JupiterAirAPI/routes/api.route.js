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
// retrive the airlines
router.get('/airlines', airline_controller.getAirlinesDetails)
// retrive the airline
router.get('/airline:id', airline_controller.getAirlineDetails)
// add the airlines
router.post('/airline', airline_controller.addAirlineDetails)
// update the airlines
router.put('/airline:id', airline_controller.updateAirlineDetails)
// delete the airlines
router.delete('/airline', airline_controller.deleteAirlineDetails)

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;