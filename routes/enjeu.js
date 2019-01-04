var express = require('express');
var router = express.Router();
var EspaceDeTravail = require('../models/EspaceDeTravail');
var Enjeu = require('../models/Enjeu.js');
var Personne = require('../models/Personne.js');

var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


router.get('/clean', function(req, res, next) {
  Enjeu.find()
  .exec((err, enjeux) => {
  console.log("Populated enjeu " + enjeux);
  console.log("Longueur enjeu " + enjeux.length);
  for (var enjeu of enjeux){
      console.log("enjeu : ",enjeu)
      console.log("authorisedUsers in espace :","authorisedUsers" in enjeu)
      if(! ("titre" in enjeu) || enjeu.titre == "" ){
          console.log("Delete enjeu._id",enjeu._id)
          Enjeu.findByIdAndRemove(enjeu._id, {},function (err, post) {
              if (err) return console.log(err);
              console.log("enjeu deleted : ",post)
          })
      }
  }
  Enjeu.find().populate({path : 'opinions', populate : {path : 'authorModel'}}).lean()
      .exec((err, enjeux2) => {
      res.json(enjeux2)
    })
  });
})

/*.populate('opinion').exec((err, opinion) => {
      console.log("Populated User " + opinion);
    })
*/


/* GET ALL enjeu */
router.get('/', function(req, res) {
  Enjeu.find().populate({path : 'opinions', populate : {path : 'authorModel'}}).lean()
    .exec((err, enjeu) => {
      console.log("Populated enjeu " + enjeu);
      res.json(enjeu)
    });
  
});

/* GET enjeu by title*/
router.get('/findByTitle/:title', function(req, res) {
  Enjeu.find({title:req.params.titre}).populate({path : 'opinions', populate : {path : 'authorModel'}}).lean()
    .exec((err, enjeu) => {
      console.log("Populated enjeu " + enjeu);
      res.json(enjeu)
    });
  
});

/* GET SINGLE enjeu BY ID */
router.get('/:id', function(req, res, next) {
  Enjeu.findById(req.params.id).populate({path : 'opinions', populate : {path : 'authorModel'}}).lean()
    .exec((err, enjeu) =>{
      if (err) return next(err);
      res.json(enjeu);
    });
});

//ADD like
router.get('/addLike/:id', function(req, res, next) {
  Enjeu.updateOne(
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
  Enjeu.updateOne(
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
  Enjeu.updateOne(
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
  Enjeu.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { dontLike: -1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});


/* SAVE enjeu */
router.post('/', function(req, res) {
  console.log("req.body",req.body)
  var d = req.body

  var e = new Enjeu({
    like: 0,
    dontLike: 0,
    likeBy: [],
    dontLikeBy: [],
    titre : d.titre,
    description : d.description,
    categories : d.categories,
    badges : d.badges,
    opinions : [],
    edt:d.edt
  })

  e.save((err, data) => {
    if (err) {
       console.log(err);
    }
    res.json(data);
    console.log(data);
  })
  console.log("e : ",e)
  console.log("edt :",req.body.edt)
  

  EspaceDeTravail.findOneAndUpdate({ "_id" : req.body.edt },
    {    $push: {
            enjeux: e
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
          console.log("doc edts updated : ",doc)
        }
    })
  
});

/* ADD opinion */
router.put('/addOpinion/:id', function(req, res, next) {

console.log(req.body)

  Enjeu.findByIdAndUpdate(req.params.id,
  {    $push: {
        opinions: req.body.opinionId
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

/* UPDATE Enjeu */
router.put('/:id', function(req, res, next) {
  console.log("req.body put",req.body)
  
  Enjeu.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/*
// DELETE Enjeu all
router.delete('/all', function(req, res, next) {
  console.log("req.body",req.body)
  Enjeu.remove({}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/



/* DELETE Enjeu */
router.delete('/:id', function(req, res, next) {
  console.log("req.body",req.body)
  Enjeu.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



module.exports = router;
