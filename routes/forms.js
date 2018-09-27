var express = require('express');
var router = express.Router();
var Form = require("../models").Form;

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try {
    const forms = await Form.findAll();
    //console.log(forms);
    res.render('form_list', { forms: forms });

  } catch (e) { console.log(e); }
  
  
  
  
});

router.get('/create_form', function(req, res, next) {
  
  res.render('create_form', { title: 'Express' });
});


router.get('/update_form/:id', async function(req, res, next) {

    const form = await Form.findById(req.params.id);
  
    res.render('update_form', { form: form });
});


router.post('/update_form/:id', async function(req, res, next) {

    
    const id = req.params.id;

    const form = await Form.findById(id);
    console.log(req.body);
    await form.updateAttributes(req.body);
  
    res.redirect("/forms");
});



router.post('/create_form', async function(req, res, next) {
  
  
  const form = await Form.create(req.body);

  //console.log(form);
  
  res.redirect("/forms/field_list/" + form.id);
  //res.render('create_form', { title: 'Express' });
});

router.get('/delete_form/:id', async function(req, res, next) {
  
    await Form.destroy({ where: {id: req.params['id']}});
    res.redirect("/forms");

  });

router.get('/field_list/:id', async function(req, res, next) {
  
  try {
    const form = await Form.findById(req.params['id']);
    console.log(req.params['id']);
    res.render('field_list', { form: form });
    
  } catch (e) { console.log(e); }
  
});

module.exports = router;