let mongoose = require('mongoose');
let crypto = require('crypto');
let config = require('config');
var jwt = require('jsonwebtoken');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    name: String,
    token: String,
});

userSchema.methods.setPassword = password => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
userSchema.methods.validPassword = password => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, config.get('secret_key'));
};
mongoose.model('User', userSchema);