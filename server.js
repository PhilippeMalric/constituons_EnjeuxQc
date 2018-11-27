
//Install express server
const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require("body-parser");
var createError = require('http-errors');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/enjeuxqc_test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var personneApiRouter = require('./routes/personne');
var enjeuApiRouter = require('./routes/enjeu');
var opinionApiRouter = require('./routes/opinion');


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



app.use('/api/personne', personneApiRouter);
app.use('/api/enjeu', enjeuApiRouter);
app.use('/api/opinion', opinionApiRouter);

app.use(express.static(__dirname + '/dist'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})



app.use(bodyParser.urlencoded({
  extended: true
}));

