var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EspaceDeTravail = require('../models/EspaceDeTravail');
var Personne = require('../models/Personne.js');
var Opinion = require('../models/Opinion.js');

/*.populate('opinion').exec((err, opinion) => {
      console.log("Populated User " + opinion);
    })
*/


router.get('/clean', function(req, res, next) {
    EspaceDeTravail.find().populate("authorisedUsers").populate("proprietaire").populate({path : 'enjeux', populate : {path : 'opinions', populate :{path : 'authorModel'}}}).lean()
    .exec((err, espaceDeTravail) => {
    console.log("Populated espaceDeTravail " + espaceDeTravail);
    for (espace of espaceDeTravail){
        console.log("espace : ",espace)
        if(! "nom" in espace || espace.nom == "" || ! "description" in espace || espace.description == "" ||
            ! "authorisedUsers" in espace || espace.authorisedUsers.length <= 0){
            EspaceDeTravail.findByIdAndRemove(espace._id,{},function (err, post) {
                if (err) return next(err);
                console.log("espace deleted : ",espace)
            })
        }
    }
    res.json({clean:true})
  });
  
});

/* GET ALL EspaceDeTravail */
router.get('/', function(req, res, next) {
    EspaceDeTravail.find().populate("authorisedUsers").populate("proprietaire").populate({path : 'enjeux', populate : {path : 'opinions', populate :{path : 'authorModel'}}}).lean()
    .exec((err, espaceDeTravail) => {
    console.log("Populated espaceDeTravail " + espaceDeTravail);
    res.json(espaceDeTravail)
  });
  
});

/* GET SINGLE EspaceDeTravail BY ID */
router.get('/:id', function(req, res, next) {
    EspaceDeTravail.findById(req.params.id).populate("authorisedUsers").populate("proprietaire").populate({path : 'enjeux', populate : {path : 'opinions', populate :{path : 'authorModel'}}}).lean()
      .lean()
      .exec((err, espaceDeTravail) =>{
        if (err) return next(err);
        res.json(espaceDeTravail);
      });
  });

router.post('/', function(req, res) {
console.log("req.body",req.body)
var d = req.body

var e = new EspaceDeTravail({   
    nom : d.nom,
    authorisedUsers : d.authorisedUsers,
    proprietaire : d.proprietaire,
    description : d.description,
    enjeux : d.enjeux
})

e.save()
res.json(e);
});

/* UPDATE EspaceDeTravail */
router.put('/:id', function(req, res, next) {
console.log("req.body put",req.body)

EspaceDeTravail.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
});
});


/* DELETE EspaceDeTravail */
router.delete('/:id', function(req, res, next) {
console.log("req.body",req.body)
EspaceDeTravail.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
});
});

  
module.exports = router;