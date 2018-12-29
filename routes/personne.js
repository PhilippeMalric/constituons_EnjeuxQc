var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Personne = require('../models/Personne.js');
var Opinion = require('../models/Opinion.js');

/*.populate('opinion').exec((err, opinion) => {
      console.log("Populated User " + opinion);
    })
*/


/* GET ALL Personne */
router.get('/', function(req, res, next) {
  Personne.find().populate('opinions').exec((err, personne) => {
    console.log("Populated personne " + personne);
    res.json(personne)
  });
  
});

/* GET Personne by title*/
router.get('/findByName/:name', function(req, res) {
  Personne.find({name:req.params.name}).populate({path : 'opinions'}).lean()
    .exec((err, enjeu) => {
      console.log("Populated opinion " + enjeu);
      res.json(enjeu)
    });
  
});

/* GET SINGLE Personne BY ID */
router.get('/:id', function(req, res, next) {
  Personne.findById(req.params.id, function (err, personne) {
    if (err) return next(err);
    res.json(personne);
  });
});

//ADD like
router.get('/addLike/:id', function(req, res, next) {
  Personne.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { like: 1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});

//REMOVE like
router.get('/remLike/:id', function(req, res, next) {
  Personne.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { like: -1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});

//ADD dontLike
router.get('/addDontLike/:id', function(req, res, next) {
  Personne.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { dontLike: 1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});

//REMOVE dontLike
router.get('/remDontLike/:id', function(req, res, next) {
  Personne.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { dontLike: -1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});


/* SAVE Personne */
router.post('/', function(req, res, next) {
console.log("req.body",req.body)
var d = req.body

var p = new Personne({
  like: 0,
  dontLike: 0,
  likeBy: [],
  dontLikeBy: [],
  nom : d.nom,
  prenom : d.prenom,
  description : d.description,
  slogan : d.slogan,
  photo : d.photo,
  createBy_userId:d.userId
})

p.save()
res.json(p);
});

/* UPDATE Personne */
router.put('/:id', function(req, res, next) {
  console.log("req.body",req.body)
  Personne.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/*
// DELETE Personne all 
router.delete('/all', function(req, res, next) {
  console.log("req.body",req.body)
  Personne.remove({}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/


/* DELETE Personne */
router.delete('/:id', function(req, res, next) {
  console.log("req.body",req.body)
  Personne.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
