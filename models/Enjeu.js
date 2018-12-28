var mongoose = require('mongoose');

var EnjeuSchema = new mongoose.Schema({
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
    titre: String,
    description: String,
    categories: [String],
    badges: String,
    opinions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'opinion'
      }]
});

module.exports = mongoose.model('enjeu', EnjeuSchema);

