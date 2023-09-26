var express = require('express');
var router = express.Router();

//Define all controller

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send({ status: false })
});


module.exports = router;