var mongoose = require('mongoose');

var PersonneSchema = new mongoose.Schema({
  like: {
    type: Number
  },
  dontLike: {
    type: Number
  },
  likeBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personne'
  }],
  dontLikeBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personne'
  }],
  nom: {
    type: String
  },
  prenom: {
    type: String
  },
  description: {
    type: String
  },
  slogan: {
    type: String
  },
  photo: {
    type: String
  },
  opinions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'opinion'
  }]
});

module.exports = mongoose.model('personne', PersonneSchema);
