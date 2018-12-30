var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var EspaceDeTravail = require('../models/EspaceDeTravail');
var User = require('../models/users');
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

/* Add User EspaceDeTravail */
router.put('/addUser/:id', function(req, res, next) {
    console.log("addUser req.body :",req.body)

    EspaceDeTravail.findOneAndUpdate({ "_id" : req.params.id },
        {    $push: {
            authorisedUsers: req.body.authorisedUser
            }
        },
        {
            new: true,
            sort: {_id: -1},
            upsert: true
        },
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            res.json(doc)
            }
        })

    User.findOneAndUpdate({ "_id" : req.body.authorisedUser },
        {    $push: {
                edts: req.params.id
            }
        },
        {
            new: true,
            sort: {_id: -1},
            upsert: true
        },
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
            console.log("doc user updated : ",doc)
            }
        })
});

/* Add Enjeu EspaceDeTravail */
router.put('/addEnjeu/:id', function(req, res, next) {
    console.log("addEnjeu req.body :",req.body)
    
    EspaceDeTravail.findByIdAndUpdate(req.params.id,
        {    $push: {
            enjeux: req.body.newEnjeu
            }
        },
        {safe: true, upsert: true},
        function(err, doc) {
            if(err){
            console.log(err);
            }else{
              res.json(doc)
            }
        })
      
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