var express = require('express');
var router = express.Router();
var Opinion = require('../models/Opinion.js');
var Enjeu = require('../models/Enjeu.js');
var Personne = require('../models/Personne.js');

/*.populate('opinion').exec((err, opinion) => {
      console.log("Populated User " + opinion);
    })
*/


/* GET ALL Opinion */
router.get('/', function(req, res, next) {
  Opinion.find().populate('authorModel').populate('enjeux').exec((err, opinion) => {
    console.log("Populated opinion " + opinion);
    res.json(opinion)
  });
  
});

/* GET enjeu by title*/
router.get('/findByTitle/:title', function(req, res) {
  Opinion.find({name:req.params.title}).populate({path : 'authorModel'}).lean()
    .exec((err, enjeu) => {
      console.log("Populated opinion " + enjeu);
      res.json(enjeu)
    });
  
});


/* GET SINGLE Opinion BY ID */
router.get('/:id', function(req, res, next) {
  Opinion.findById(req.params.id, function (err, opinion) {
    if (err) return next(err);
    res.json(opinion);
  });
});

//ADD like
router.get('/addLike/:id', function(req, res, next) {
  Opinion.updateOne(
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
  Opinion.updateOne(
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
  Opinion.updateOne(
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
  Opinion.updateOne(
    { '_id' : ObjectId(req.params.id) }, 
    { $inc: { dontLike: -1 } },
    function (err, result) {
       if (err) throw err;
       console.log(result);
       res.json(result);
    })
});



router.post('/byEnjeu', function(req, res, next) {
  console.log("req.body",req.body)
  Opinion.find({enjeux:{$in:req.body}}).populate({path : 'authorModel'}).lean()
  .exec((err, opinion) => {
    console.log("Populated opinion " + opinion);
    res.json(opinion)
  });
});


var addOpinionToEnjeu = function(id,opinionId){

  Enjeu.findById(id,function(err, enjeu){
    console.log("enjeu",enjeu)
    enjeu.opinions.push(opinionId)

  })

}

var addOpinionToPersonne = function(id,opinionId){

  Personne.findById(id,function(err, personne){

    personne.opinions.push(opinionId)

  })

}

/* SAVE Opinion */
router.post('/', function(req, res, next) {
console.log("req.body",req.body)
var d = req.body

enjeuxTab = []
if(d.enjeux && d.enjeux.length() > 0){
  for (let e of d.enjeux) {

    enjeu = new Enjeu({
      like: 0,
      dontLike: 0,
      likeBy: [],
      dontLikeBy: [],
      titre : e.titre,
      description : e.description,
      categorie : e.categorie,
      badges : e.badges,
      opinions : []
    })
    enjeu.save()
    enjeuxTab.push(enjeu)
  }
}
else{
  enjeuxTab.push(d.enjeuId);
}

if(!d.personneId){
  p1 = new Personne({
    nom : "test",
    prenom : "",
    slogan : "",
    photo : ""
  })
  p1.save();
  var o1 = new Opinion({
    enjeu: d.enjeu,
    title: d.title,
    description: d.description,
    author: d.author,
    authorModel: p1,
    enjeux : enjeuxTab
  });
}
else{

  var o1 = new Opinion({
    enjeu: d.enjeu,
    title: d.title,
    description: d.description,
    author: d.author,
    authorModel: d.personneId,
    enjeux : enjeuxTab,
    authorModel : d.personneId
  });

  addOpinionToPersonne(d.personneId,o1)

  for (e of enjeuxTab){

    addOpinionToEnjeu(e,o1)

  }
  

}

o1.save();

res.json(o1);


});

/* UPDATE Opinion */
router.put('/:id', function(req, res, next) {
  console.log("req.body",req.body)
  Opinion.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* 
// DELETE Opinion all 
router.delete('/all', function(req, res, next) {
  console.log("req.body",req.body)
  Opinion.remove({}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
*/


var deleteOpinionToEnjeu = function(id,opinionId){

  Enjeu.findById(id,function(err, enjeu){
    console.log("enjeu",enjeu)
    for( var i = 0; i < enjeu.opinions.length-1; i++){ 
      if ( enjeu.opinions[i] === opinionId) {
        enjeu.opinions.splice(i, 1); 
      }
    }
  })

}

var deleteOpinionToPersonne = function(id,opinionId){

  Personne.findById(id,function(err, personne){

    for( var i = 0; i < personne.opinions.length-1; i++){ 
      if ( personne.opinions[i] === opinionId) {
        personne.opinions.splice(i, 1); 
      }
   }

  })

}

/* DELETE Opinion */
router.delete('/:id', function(req, res, next) {
  console.log("req.body",req.body)
  opinionId = req.params.id
  Opinion.findByIdAndRemove(opinionId, req.body, function (err, opinion) {
    if (err) return next(err);
    for(e of opinion.enjeux){
      deleteOpinionToEnjeu(e,opinionId)
    }
    deleteOpinionToPersonne(opinion.personneId,opinionId)
    res.json(opinion);
  });
});

router.post('/deleteFromOneEnjeu', function(req, res, next) {
  console.log("req.body",req.body)
  opinionId = req.body.opinionId
  enjeuId = req.body.enjeuId
  Opinion.findById(opinionId, req.body, function (err, opinion) {
    if (err) return next(err);
    if(opinion.enjeux > 1){
      for( var i = 0; i < opinion.enjeux.length-1; i++){ 
        if ( opinion.enjeux[i] === opinionId) {
          opinion.enjeux.splice(i, 1); 
        }
     }
      deleteOpinionToEnjeu(enjeuId,opinionId)
    }
    //si il n'y a qu'un enjeu ayant l'opinion
    else{
        Opinion.findByIdAndRemove(opinionId, req.body, function (err, opinion) {
        if (err) return next(err);
        for(e of opinion.enjeux){
          deleteOpinionToEnjeu(e,opinionId)
        }
        deleteOpinionToPersonne(opinion.personneId,opinionId)
        res.json(opinion);
      });
    }
    deleteOpinionToPersonne(opinion.personneId,opinionId)
    res.json(opinion);
  });
});


module.exports = router;