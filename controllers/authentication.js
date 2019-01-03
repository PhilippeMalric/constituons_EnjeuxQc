var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var EspaceDeTravail = require('../models/EspaceDeTravail');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }


EspaceDeTravail.findOne({nom:"Publique"}).exec((err2,edt)=>{

  console.log("edt : ",edt)

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  
  user.personneCreated = [];
  user.associatedPersonne = null;
  user.setPassword(req.body.password);
  var edt1 = null
  if (edt){
    edt1 = edt._id
  }
  else{
    edt1 = new EspaceDeTravail({
      nom:"Publique",
      authorisedUsers:[user],
      proprietaire: user,
      description:"Espace publique",
      enjeux: []
    })
    edt1.save()
    
  }
  console.log("edt1 : ",edt1)
  user.edts = [edt1._id];
  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
      });
    });
  })
};

module.exports.login = function(req, res, next) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res, next);

};
