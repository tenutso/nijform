var express = require('express');
var router = express.Router();
var Form = require("../../models").Form;
var Field = require("../../models").Field;


// Radio buttons

// Create radio field
router.get('/create_radio/:id', async function (req, res, next) {

    const form = await Form.findById(req.params.id);

    res.render('fields/create_radio', { form: form });
});

// Save radio field
router.post('/create_radio', async (req, res) => {

    const field = req.body;

    await Field.create(field);

    res.redirect("/forms/field_list/" + field.FormId);
});

// Update radio Field
router.get('/update_radio/:id', async (req, res) => {

    const field = await Field.findOne({
        where: {
            id: req.params.id
        },
        include: [Form]
    });

    //console.log(field);
    res.render('fields/update_radio', { field: field });
});

router.post('/update_radio', async (req, res) => {

    const field = await Field.findById(req.body.id);

    //console.log(req.body.id);

    await field.updateAttributes(req.body);

    res.redirect("/forms/field_list/" + field.FormId);
});



router.get('/radios/:id', async function (req, res, next) {

    const field = await Field.findOne({
        where: {
            id: req.params.id
        },
        include: [Form]
    });

    res.render('fields/radios', { field });
});

router.post('/update_radio_options/:id', async function (req, res, next) {

    const field = await Field.findById(req.params.id);

    // Find total number of options
    var t = [];
    for (option in req.body) {
        var num = option.split('_');
        t.push(num[1]);
    }
    var max = Math.max(...t) + 1;

    const options = []
    for (i = 0; i < max; i++) {
        options.push({
            name: req.body['list-name_' + i],
            value: req.body['list-value_' + i],
            sort: req.body['sort_' + i]
        });
    }


    //console.log(options);

    await field.updateAttributes({ options: options });

    res.redirect("/forms/field_list/" + field.FormId);
});

module.exports = router;