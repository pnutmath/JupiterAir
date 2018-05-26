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
    Airline.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                slogan: req.body.slogan,
                founded_on: req.body.founded_on,
                origin_contry: req.body.origin_contry,
                hubs: req.body.hubs,
                focus_cities: req.body.focus_cities,
                best_travel_reward: req.body.best_travel_reward
            }
        }, (err, item) => {
            if (err) {
                res.json({ mag: "Unable to update item", err: err });
            } else {
                res.json({ msg: 'Item updated successfully' });
            }
        });

}
module.exports.deleteAirlineDetails = (req, res) => {
    Airline.remove(
        { _id: req.params.id }, (err, item) => {
            if (err) {
                res.json({ mag: "Unable to delete item", err: err });
            } else {
                res.json({ msg: 'Item delete successfully' });
            }
        });
}
module.exports.getAirlinesDetails = (req, res) => {

    Airline.find((err, items) => {
        err ? res.json(err) : res.json(items);
    });
}
module.exports.getAirlineDetails = (req, res) => {
}