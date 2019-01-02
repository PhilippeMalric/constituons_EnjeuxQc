var mongoose = require('mongoose');

var OpinionSchema = new mongoose.Schema({
  like: {
    type: Number
  },
  dontLike: {
    type: Number
  },
  enjeux: {
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
  title: String,
  author: String,
  authorModel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'personne'
  },
  enjeux: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'enjeu'
  }],
  description: String,
  source: String
});

module.exports = mongoose.model('opinion', OpinionSchema);
