
var express = require('express');
var router = express.Router();
var EspaceDeTravail = require('../models/EspaceDeTravail');
var User = require('../models/users');
var Personne = require('../models/Personne.js');
var Enjeu = require('../models/Enjeu.js');
var Opinion = require('../models/Opinion.js');

function nextLetter(s){
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function(a){
        var c= a.charCodeAt(0);
        switch(c){
            case 90: return 'A';
            case 122: return 'a';
            default: return String.fromCharCode(++c);
        }
    });
}

var checkNom = function(edts,ancienNom){
    nouveauNom = ancienNom
    preFix_uniq = ""
    for(espaceI in edts){
        //Pour la génération d'un nom unique
        if(espaceI < edts[espaceI].nom.length){
            preFix_uniq += nextLetter(edts[espaceI].nom[espaceI])
            if(edts[espaceI].nom == ancienNom){
                nouveauNom = preFix_uniq + "_" + ancienNom
                return nouveauNom
            }
        }
        else{
            preFix_uniq += "_"
        }
    }
    return nouveauNom
}

router.post('/:userId', function(req, res, next) {
    data = req.body
    userId = req.params.userId

    console.log("PostFile : req.params.userId :",userId);
    console.log("PostFile : req.body :",req.body);

    var nouvelEspace = new EspaceDeTravail({})
    nouvelEspace.authorisedUsers = [userId]
    nouvelEspace.proprietaire = userId
    var ancienNom = data.nom

    User.findById(userId).populate("edts").exec((err,res)=>{
        
        user = res;
        nouveauNom = checkNom(user.edts,ancienNom)
        nouvelEspace.nom = nouveauNom
        //Lien avec l'utilisateur
        User.findOneAndUpdate({ "_id" : userId },
        {    $push: {
                edts: nouvelEspace
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

        
        //Chercher les opinions
        var opinionsD = {}
        for(enj of data.enjeux){
            for(opi of enj.opinions){
                opinionsD[opi._id] = opi
            }
        }

        var convertO = {}

        for (var key in opinionsD){
            o = opinionsD[key]
            newO = new Opinion({
                like:o.like,
                dontLike:o.dontLike,
                nom:o.nom,
                dontLikeBy:o.dontLikeBy,
                description:o.description,
                slogan:o.slogan,
                photo:o.photo,
                createBy_userId:userId
            })
            //Il manque les enjeux
            newO.enjeux = []
            console.log("Avant Convert newO : ", newO)
            convertO[key] = newO
            newO.save()
        }

        //recherche des personnes Pour les creer seulement une fois
        var personnesD = {}
        for(enj of data.enjeux){
            for(op of enj.opinions){
                personnesD[op.authorModel._id] = op.authorModel
            }
        }

        // convert Ancien personne to new personne
        var convertP = {}

        for (var key in personnesD){
            
            p = personnesD[key]

            //Ajout des opinions a l'auteur
            var opiArray = []
            for(op of p.opinions){
                newOp = convertO[op]
                console.log("newOp : ",newOp)
                opiArray.push(newOp) 
            }

            p = personnesD[key]
            newP = new Personne({
                likeBy:p.likeBy,
                dontLikeBy:p.dontLikeBy,
                like:p.like,
                dontLike:p.dontLike,
                nom:p.nom,
                description:p.description,
                slogan:p.slogan,
                photo:p.photo,
                createBy_userId:userId,
                opinions:opiArray
            })
           
            //Ajout de l'auteur a l'opinion
            for(op of opiArray){
                console.log("op : ",op)
                op.authorModel = newP
            }

            convertP[key]  = newP
            newP.save()
        }



        // ajout des enjeux

        nouvelEspace.enjeux = []

        for(enj of data.enjeux){

            //createArrayOfOpinion
            var newOpinionsArray = []
            for(opi of enj.opinions){
                newOpinionsArray.push(convertO[opi._id])
            }


            newE = new Enjeu({
                likeBy:enj.likeBy,
                dontLikeBy:enj.dontLikeBy,
                categories:enj.categories,
                opinions:newOpinionsArray,
                like:enj.like,
                dontLike:enj.dontLike,
                titre:enj.titre,
                description:enj.description,
                badges:enj.badges,
                edt:nouvelEspace
            })

            //ajout de l'enjeu aux opinions
            for(opi of enj.opinions){
                convertO[opi._id].enjeux.push(newE)
            }

            nouvelEspace.enjeux.push(newE)
            newE.save()
        }
        nouvelEspace.save()
    })
    res.send("202")
})

module.exports = router;