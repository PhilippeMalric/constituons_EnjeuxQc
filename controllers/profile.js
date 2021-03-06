var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id).populate({path : 'edts', populate : {path : 'enjeux', populate : {path : 'opinions', populate : {path : 'authorModel'}}}})
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
module.exports.getUsers = function(req, res) {

    User
      .find()
      .exec(function(err, users) {
        console.log("users : ",users)
        res.status(200).json(users.map(u => {return {id:u._id,name:u.name}}));
      });

};

module.exports.getUser = function(req, res) {
  
  User
    .findById(req.params.id)
    .exec(function(err, user) {
      console.log("user : ",user)
      res.status(200).json(user);
    });

};
