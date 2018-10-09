var express = require('express');
var router = express.Router();
var Form = require("../models").Form;
var Field = require("../models").Field;
const { check, validationResult } = require('express-validator/check');

// List All Forms
router.get('/', async function(req, res, next) {
  
  try {
    const forms = await Form.findAll();
    //console.log(forms);
    res.render('form_list', { forms: forms });

  } catch (e) { console.log(e); }
  
});

// Create a form
router.get('/create_form', function(req, res, next) {

  const form = {
    title: '',
    slug: '',
    enabled: 1
  }
  
  res.render('create_form', { form: form });
});

// Save a form
router.post('/create_form', [
  // validation goes here
], async (req, res, next) => {
  
  var form = req.body;
  var slug = form.slug;

  if (!slug.length) {
    // if no slug specified, use the title.
    slug = form.title;
  } 
  // Strip any chars that are not 
  // alpha, numeric, underscore or spaces
  slug = slug.replace(/[^\w\s]/gi,''); 
  // replace any spaces with underscore
  form.slug = slug.replace(/\s/gi,'_').toLowerCase(); 

  const duplicate = await Form.findAll({
    where: {
      slug: form.slug
    }
  });
  
  if (duplicate.length) {
    req.flash("danger", "Slug already in use");
    res.render('create_form', {form:form});
  }
  else {
    // create form and retreive new id
    form = await Form.create(req.body);
    req.flash("success", "Form saved");
    res.redirect("/forms/field_list/" + form.id);
  }
});

// Update a form
router.get('/update_form/:id', async function(req, res, next) {

    
    
    const form = await Form.findById(req.params.id);
    
    res.render('update_form', { form: form });
});

// Update a form
router.post('/update_form/:id', async function(req, res, next) {

    const id = req.params.id;
    const title = req.body.title;
    let slug = req.body.slug;

    if (!slug.length) {
      // if no slug specified, use the title.
      slug = title;
    } 
    // Strip any chars that are not 
    // alpha, numeric, underscore or spaces
    slug = slug.replace(/[^\w\s]/gi,''); 
    // replace any spaces with underscore
    req.body.slug = slug.replace(/\s/gi,'_').toLowerCase(); 
    
    const form = await Form.findById(id);
    
    await form.updateAttributes(req.body);
    
    //req.flash("success", "Form saved");
    res.redirect("/forms");
});

router.get('/delete_form/:id', async function(req, res, next) {
  
    await Form.destroy({ where: {id: req.params['id']}});
    res.redirect("/forms");

  });

router.get('/field_list/:id', async function(req, res, next) {
  
  try {
    const form = await Form.findById(req.params.id);
    const fields = await Field.findAll({
      where: {
        FormId: req.params.id
      },
      order: [ ['sorting', 'ASC'] ]
    });
    
    res.render('field_list', { form: form, fields: fields });
    
  } catch (e) { console.log(e); }
  
});

router.get('/delete_field/:id', async function(req, res, next) {
  
  await Field.destroy({ where: {id: req.params.id}});
  res.redirect("/forms/field_list/");
});

router.post('/update_sorting', async function(req, res, next) {
    
  const order = req.body['sort[]'];
  for (var i=0; i < order.length; i++) {
    const field = await Field.findById(order[i]);
    await field.updateAttributes({sorting:i});
  }
  res.send("200");
});


module.exports = router;