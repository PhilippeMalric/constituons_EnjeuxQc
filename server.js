
//Install express server
const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require("body-parser");
var createError = require('http-errors');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/enjeuxqc_test'

if (process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI)
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app termination', function() {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./models/users');

var authApiRouter = require('./routes/auth');
var personneApiRouter = require('./routes/personne');
var enjeuApiRouter = require('./routes/enjeu');
var opinionApiRouter = require('./routes/opinion');
var espaceDeTravail = require('./routes/espace-de-travail');
var postFile = require('./routes/postFile');

var cors = require('cors')

var corsOptions = {
  origin: ['http://localhost:80', 'http://enjeuxqc.hopto.org', 'http://localhost'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

var fs = require('fs');

app.set('view engine', 'ejs');


console.log(path.join(__dirname + '/dist/index.html'))


app.listen(80, function () {
  console.log("App now running on port : ", 80);
});




COLLECTION = "Collection"

app.use(cors(corsOptions))

/*
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/


app.use(bodyParser.json());

var db;


// connect to db

  // Connect to the database before starting the application server.

require('./config/passport');
app.use('/api', authApiRouter);
app.use('/api/personne', personneApiRouter);
app.use('/api/enjeu', enjeuApiRouter);
app.use('/api/opinion', opinionApiRouter);
app.use('/api/espaceDeTravail', espaceDeTravail);
app.use('/api/postFile', postFile);



app.use(express.static(__dirname + '/dist'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})



app.use(bodyParser.urlencoded({
  extended: true
}));

