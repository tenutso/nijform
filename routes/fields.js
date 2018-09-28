var express = require('express');
var router = express.Router();
var Form = require("../models").Form;


// Text Field

router.get('/create_text/:id', async function(req, res, next) {
  
    const form = await Form.findById(req.params.id);

    res.render('fields/create_text', { form: form });
});
  
module.exports = router;