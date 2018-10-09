const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = require('chai').expect;
const should = require('chai').should;
const models = require('../models');

chai.use(chaiHttp);

describe('Forms', () => {

    beforeEach( (done) => {
        models.Form.destroy({
            where: {},
            truncate: true
        });
        done();
    });
    
    describe('/GET Forms', () => {
        it('List all forms', () => {
            chai.request(app).get('/forms').end((err, res) => {
                expect(res.status).to.equal(200);
                done();
            });
        });
    });

    describe('/POST a form', () => {
    
        it('Create a new form', () => {
            const form = {
                title: 'This is a test form',
                slug: 'this_is_a_test_form',
                enabled: 1
            };
            chai.request(app).post('/forms/create_form').send(form).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            })
        });
    });
});