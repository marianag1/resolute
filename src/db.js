const mongoose = require('mongoose');

// setup mongoDB connection
// make sure to change mongoURL to your mongoURI!
// const mongoURL = 'mongodb+srv://admin:database1@cluster0-nlhr5.mongodb.net/test?retryWrites=true';
const mongoURL =  process.env.ATLAS_SRV;
const options = {
    useNewUrlParser: true
};

// connect to mongoDB
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() { console.log('database connected'); });
module.exports = db;
