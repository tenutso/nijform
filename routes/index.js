var express = require('express');
var router = express.Router();
var Form = require("../models").Form;

/* GET home page. */
router.get('/', async function(req, res, next) {
  const forms = await Form.findAll();
  console.log(forms);
  res.render('index', { forms: forms });
});

router.get('/create_form', function(req, res, next) {
  
  res.render('create_form', { title: 'Express' });
});

router.post('/create_form', async function(req, res, next) {
  
  
  await Form.create(req.body);

  console.log(req.body);
  
  res.redirect("/");
  //res.render('create_form', { title: 'Express' });
});

module.exports = router;
