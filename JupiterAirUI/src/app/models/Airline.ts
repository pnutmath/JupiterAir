export class Airline {
    _id: String;
    name: String;
    slogan: String;
    rating: [{
        username: { type: String, ref: 'User', required: true },
        rate: Number
    }];
    comments: [{
        username: { type: String, ref: 'User', required: true },
        comment: String
    }];
    founded_on: Number;
    hubs: [String];
    focus_cities: [String];
    airlinePic: File;
    origin_contry: String;
    best_travel_reward: String;
}
