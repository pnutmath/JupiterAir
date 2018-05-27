const mongoose = require('mongoose');
let Airline = require('../models/Airline');

module.exports.addAirlineDetails = (req, res) => {

    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: Dont try in novice hacker way"
        });
    } else {
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
    }
}
module.exports.updateAirlineDetails = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: Dont try in novice hacker way"
        });
    } else {
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
                    res.json({ msg: "Unable to update item", err: err });
                } else {
                    res.json({ msg: 'Item updated successfully' });
                }
            });
    }
}
module.exports.deleteAirlineDetails = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: Dont try in novice hacker way"
        });
    } else {
        Airline.remove(
            { _id: req.params.id }, (err, item) => {
                if (err) {
                    res.json({ msg: "Unable to delete item", err: err });
                } else {
                    res.json({ msg: 'Item delete successfully' });
                }
            });
    }
}
module.exports.getAirlinesDetails = (req, res) => {

    Airline.find((err, items) => {
        err ? res.json(err) : res.json(items);
    });
}
module.exports.getAirlineDetails = (req, res) => {
}
module.exports.submitReview = (req, res) => {
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: Dont try in novice hacker way"
        });
    } else {
        let userid = req.payload._id;
        let airlineid = req.params.id;
        Airline.findById({ _id: airlineid },
            (err, item) => {
                if (err) {
                    res.json({ msg: "Unable to get airline", err: err });
                } else {
                    let existingRating = item.rating.find(function (ele) {
                        return ele.username == userid;
                    });
                    let existingComment = item.comments.find(function (ele) {
                        return ele.username == userid;
                    });
                    if (existingRating) {
                        item.rating.id(existingRating._id).rate = req.body.rating;
                        item.comments.id(existingComment._id).comment = req.body.comment;
                        item.save();
                        res.json({ msg: 'Ratings updated successful' });                      
                    } else {
                        Airline.findByIdAndUpdate({ _id: airlineid }, {
                            $push: {
                                rating: {
                                    username: userid,
                                    rate: req.body.rating
                                },
                                comments: {
                                    username: userid,
                                    comment: req.body.comment
                                }
                            }
                        }, (err, data) => {
                            if (err) {
                                res.json({ msg: "Unable to store your review", err: err });
                            } else {
                                res.json({ msg: 'Ratings updated successful' });
                            }
                        });
                    }
                }
            })
    }
}


