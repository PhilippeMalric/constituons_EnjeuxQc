var mongoose = require('mongoose');

var EspaceDeTravail = new mongoose.Schema({
  
    nom: String,
    authorisedUsers:  [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    proprietaire: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    description: String,
    enjeux:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enjeu'
      }]
});

module.exports = mongoose.model('EspaceDeTravail', EspaceDeTravail);

