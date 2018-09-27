var express = require('express');
var router = express.Router();
//var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  //User.createUser('anijmeh', 'capeexe');
  res.send('respond with a resource');
});

module.exports = router;
