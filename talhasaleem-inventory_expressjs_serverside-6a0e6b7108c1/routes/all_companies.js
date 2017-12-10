var express = require('express');
var my_models = require('../models');
var myproducts = require('./products');
var router = express.Router();

/**
 * API to display All companies
 */


router.get('/', function (req, res, next) {

    /**
     * Finding all the companies
     */

    my_models.company.findAll().then(function (val) {

        /**
         * If the company table is not null then return all company details
         */
        if (val !== null) {
            res.status(200);     // Success
            res.send(val)
        }

        /**
         * Else return no companies available
         */

        else {
            res.status(204);     // No Content
            res.send('No Companies Available');
        }
    }).catch(function (err) {
        res.status(500);     // Internal Server Error
        res.send('Internal Server Error');
    })
});


/**
 * API to add a company
 */


router.post('/create', function (req, res, next) {

    /**
     * Client side code will send four parameters
     * 1) Company ID
     * 2) Company Name
     * 3) Company Phone
     * 4) Company Address
     */

    var c_id = req.body.company_id;
    var c_name = req.body.company_name;
    var c_phn = req.body.company_phone;
    var c_add = req.body.company_address;

    /**
     * Creating a new company with the parameters given
     */

    my_models.company.create({
        company_id: c_id,
        company_name: c_name,
        company_phone: c_phn,
        company_address: c_add

    }).then(function () {
        res.status(201);    // Created
        res.send('Company Created');
    }).catch(function (err) {
        res.status(400);    // Bad Request
        res.send('Invalid Inputs');
    })
});

/**
 * This code will route to products
 */

router.use('/:companyid/products', myproducts);


/**
 * API to delete a company
 */


router.delete('/:companyid/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Company ID
     */

    var comp = req.params.companyid;

    /**
     * Finding the company with the given parameter
     */

    my_models.company.find({

        where: {
            company_id: comp
        }

    }).then(function (val) {

        if (val !== null) {

            /**
             * If that company exist then find all the products
             * associated with that company id
             */

            my_models.products.findAll({

                where: {
                    company_id: comp
                }

            }).then(function (val) {

                /**
                 * Looping through products returned
                 */

                for (var i = 0; i < val.length; i++) {

                    /**
                     * Deleting all the products associated with that company
                     * from all the branches
                     */

                    my_models.branch2products.destroy({

                        where: {
                            product_id_bp: val[i].product_id
                        }

                    }).then(function () {

                        console.log('Successfully destroying branch2products');

                    }).catch(function (err) {

                        res.status(500);    // Internal Server Error
                        console.log('Error in for loop');
                        res.send('Internal Server Error');

                    });
                }
            }).catch(function (err) {

                res.status(500);    // Internal Server Error
                console.log('Error in Product Company');
                res.send('Internal Server Error');

            });

            /**
             * Now deleting the company from all the branches
             */

            my_models.branch2company.destroy({

                where: {
                    company_id_bc: comp
                }

            }).then(function () {

                /**
                 * Now deleting all the product details associated
                 * with that company id
                 */

                my_models.products.destroy({

                    where: {
                        company_id: comp
                    }

                }).then(function () {

                    /**
                     * Now finally deleting the company
                     */

                    my_models.company.destroy({
                        where: {
                            company_id: comp
                        }

                    }).then(function () {
                        res.status(200);    // Success
                        res.send('Company Deleted');
                    }).catch(function (err) {
                        res.status(500);    // Internal Server Error
                        res.send('Internal Server Error');
                    })

                }).catch(function (err) {
                    console.log('Error in Company Product Deleting');
                    res.status(500);    // Internal Server Error
                    res.send('Internal Server Error');
                })

            }).catch(function (err) {
                res.status(500);    // Internal Server Error
                res.send('Internal Server Error');
                console.log('Error in Branch and Company Deleting');
            });

        } else {
            res.send('Company not found: 404');
        }

    }).catch(function (err) {
        res.status(404);    // URL Not Found
        console.log(err);
        res.send('URL Error, company id not found');
    });
});

/**
 * API to edit company
 */

router.patch('/:companyid/edit', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Company ID
     */

    var comp = req.params.companyid;

    /**
     * Finding the company with the given parameter
     */

    my_models.company.find({

        where: {
            company_id: comp
        }

    }).then(function (val) {

        /**
         * If that company truly exist then
         * Update the details company
         */

        if (val !== null) {

            val.update({
                company_name: req.body.company_name,
                company_phone: req.body.company_phone,
                company_address: req.body.company_address
            }).then(function () {
                res.status(200);    // Success
                res.send('Company Edited');
            }).catch(function (err) {
                res.status(500);    // Internal Server Error
                res.send('Internal Server Error');
            });

        }

        /**
         * Else return error
         */

        else {
            res.status(404);
            res.send('Company not found: 404');
        }

    }).catch(function (err) {
        res.status(404);    // URL Not Found
        console.log(err);
        res.send('URL Error, company id not found');
    })
});

/**
 * API to display a company
 */

router.get('/:companyid', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Company ID
     */

    var comp = req.params.companyid;

    /**
     * Finding the company with the given parameter
     */

    my_models.company.find({
        where: {
            company_id: comp
        }
    }).then(function (val) {

        /**
         * Return the detail of company
         */


        if (val !== null) {
            res.status(200);    // Success
            res.send(val);
        } else {
            res.status(500);    // Internal Server Error
            res.send('Internal Server Error');
        }

    }).catch(function (err) {
        res.status(404);    // Not found
        console.log('Enigma Paradigm: Error in all_companies.js catch block');
        res.send('URL Not Found');
    })
});

module.exports = router;