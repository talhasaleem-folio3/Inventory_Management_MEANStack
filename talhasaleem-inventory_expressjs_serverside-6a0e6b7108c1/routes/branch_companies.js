var express = require('express');
var my_models = require('../models');
var branch_products = require('./branch_products');
var router = express.Router();

/**
 * API to display the company of a particular branch
 */

router.post('/', function (req, res, next) {

    /**
     * Client side code will send one parameter
     * 1) Branch Id
     */

    var b_id = req.body.branch_id;
    var detail = [];

    /**
     * Finding the all companies with the given parameter of Branch
     */

    my_models.branch2company.findAll({
        where: {
            branch_id_bc: b_id
        },
        attributes: [
            'branch_id_bc',
            'company_id_bc'
        ]
    }).then(function (companies) {

        /**
         * Looping through the Branch2Company table
         */

        companies.forEach(function (comp) {

            /**
             * For each company push the details of
             * the company into the details[] array
             */

            my_models.company.find({
                where: {
                    company_id: comp.company_id_bc
                }
            }).then(function (companyDetail) {
                detail.push(companyDetail);

                /**
                 * If the length of detail equals the loop length
                 * then return with details[] array
                 */

                if (detail.length === companies.length) {
                    res.status(200);
                    res.json(detail);
                }
            }).catch(function (compErr) {
                res.status(500);
                res.json('Cannot find company id');
                console.log(compErr);
            });
        });

    }).catch(function (err) {
        res.status(400);
        res.send(err)
    });

    /** The following query is also correct, you just need to add the following import
                var sequelize = require('sequelize');
     */


    /**
     my_models.sequelize.query('SELECT * FROM companies ' +
     'INNER JOIN branch2companies ' +
     'ON company_id = company_id_bc ' +
     'AND branch_id_bc = :branch', {
        replacements: {
            branch: b_id
        },
        type: sequelize.QueryTypes.SELECT
     }).then(function (val) {})
     .catch(function (err) {});
     */
});


/**
 * API to add company of a particular branch
 */


router.post('/addcompany', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Branch Id
     * 2) Company Id
     */

    var c_id = req.body.company_id;

    // Variable for Weak Entity filling
    var b_id = req.body.b_id;

    /**
     * Adding the company into the branch
     */

    my_models.branch2company.create({

        branch_id_bc: b_id,
        company_id_bc: c_id

    }).then(function () {
        res.status(200);    // Success
        res.send('Company Added');
    }).catch(function (err) {
        res.status(400);    // Bad request
        console.log(err);
        res.send('Unable to add company');
    });
});

/**
 * API to the remove company of a particular branch
 */

router.post('/removecompany', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Branch Id
     * 2) Company Id
     */

    var c_id = req.body.company_id;

    // Variable for Weak Entity filling
    var b_id = req.body.b_id;

    /**
     * Deleting the company from the given branch
     */

    my_models.branch2company.destroy({
        where: {
            branch_id_bc: b_id,
            company_id_bc: c_id
        }
    }).then(function () {

        var p_id = [];

        /**
         * Finding all the products associated with that company
         * and saving them into an array p_id[]
         */

        my_models.products.findAll({
            where: {
                company_id: c_id
            }
        }).then(function (val) {
            p_id = val;
        }).catch(function (err) {
            res.status(500);
            res.send('Internal Server Error');
        });

        /**
         * Looping through the array p_id[] and destroying
         * these products from every branch
         */

        for (var i = 0; i < p_id.length; i++) {
            my_models.branch2products.destroy({
                where: {
                    branch_id_bp: b_id,
                    product_id_bp: p_id[i].product_id
                }
            });
        }

        res.status(200);
        res.send('Company removed');
    }).catch(function (err) {
        res.status(400);
        console.log(err);
        res.send('Unable to remove company');
    });
});

/**
 * API to display the company  products of a particular branch
 */

router.use('/products', branch_products);

module.exports = router;