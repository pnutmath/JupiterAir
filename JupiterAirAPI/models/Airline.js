let mongoose = require('mongoose');

let Schema = mongoose.Schema

let airlineSchema = mongoose.Schema({
    name: String,
    slogan: String,
    rating: [{
        username: { type: Schema.ObjectId, ref: 'User', required: true },
        rate: Number
    }],
    comments: [{
        username: { type: Schema.ObjectId, ref: 'User', required: true },
        comment: String
    }],
    founded_on: Number,
    hubs: String,
    focus_cities: [String],
    destinations: Number,
    origin_contry: String,
    best_travel_reward: String
});


module.exports = mongoose.model('Airline', airlineSchema);