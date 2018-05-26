const mongoose = require('mongoose');
let Airline = require('../models/Airline');

module.exports.addAirlineDetails = (req, res) => {
    let airline = new Airline();
    airline.name = req.body.name;
    airline.slogan = req.body.slogan;
    airline.founded_on = req.body.founded_on;
    airline.origin_contry = req.body.origin_contry;
    airline.hubs = req.body.hubs;
    airline.focus_cities = req.body.focus_cities;
    airline.best_travel_reward = req.body.best_travel_reward;
    airline.save((err) => {
        if (err) { console.error(err) }
        res.status(200);
        res.json(airline);
    });
    console.log(req.body);
    console.log(airline);
}
module.exports.updateAirlineDetails = (req, res) => {

}
module.exports.deleteAirlineDetails = (req, res) => {

}
module.exports.getAirlinesDetails = (req, res) => {
    console.log('ht');
    res.status(200);
    res.json(Airline.find({}));
}
module.exports.getAirlineDetails = (req, res) => {
}