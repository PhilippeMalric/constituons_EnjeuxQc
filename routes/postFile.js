
var express = require('express');
var router = express.Router();
router.post('/', function(req, res, next) {
    console.log("PostFile : req.body :",req.body);
    res.send("202")
})

module.exports = router;