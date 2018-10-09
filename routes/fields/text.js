var express = require('express');
var router = express.Router();
var Form = require("../../models").Form;
var Field = require("../../models").Field;

// Create Text Field
router.get('/create_text/:id', async function (req, res, next) {

    const form = await Form.findById(req.params.id);

    res.render('fields/create_text', { form: form });
});

// Save Text Field
router.post('/create_text', async (req, res) => {

    const field = req.body;
    await Field.create(field);

    res.redirect("/forms/field_list/" + field.FormId);
});

// Update Text Field
router.get('/update_text/:id', async (req, res) => {

    const field = await Field.findOne({
        where: {
            id: req.params.id
        },
        include: [Form]
    });

    //console.log(field);
    res.render('fields/update_text', { field: field });
});

router.post('/update_text', async (req, res) => {

    const field = await Field.findById(req.body.id);

    //console.log(req.body.id);

    await field.updateAttributes(req.body);

    res.redirect("/forms/field_list/" + field.FormId);
});

module.exports = router;