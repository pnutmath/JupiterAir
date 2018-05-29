const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let config = require('config');

const path = require('path');
// const favicon = require('serve-favicon');
// const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');

const apiRoutes = require('./routes/api.route');

const app = express();
const router = express.Router()

const PORT = process.env.PORT || 3000;

//connect to mongo db
mongoose.connect(config.get('mongodbpath'));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database connection successful!');
});

app.use(cors());
app.use(bodyParser.json());
require('./config/passport');
app.use(passport.initialize());
//routing
app.use('/api', apiRoutes);
// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});

app.use('/', express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT
    , () => console.log(`app listening on port ${PORT}!`));