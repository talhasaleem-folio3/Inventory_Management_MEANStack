var express = require('express');
var my_models = require('../models');
var router = express.Router();

/**
 * API to display all products
 */

router.post('/', function (req, res, next) {

    /**
     * Client side code will send one parameter
     * 1) Company Id
     */

    var comp = req.body.companyid;

    /**
     * Finding all the products of the given company
     */

    my_models.products.findAll({
        where: {
            company_id: comp
        }
    }).then(function (val) {
        if(val !== null) {

            /**
             * Sending all the products of that company
             */

            res.status(200);
            res.send(val);
        } else {
            res.status(204);
            res.send('No Products available');
        }
    }).catch(function (err) {
        res.status(400);
        res.send('Invalid company ID');
        console.log('Enigma Paradigm: Error in all_companies.js catch block');
    });
});

/**
 * API to add products
 */

router.post('/add_product', function (req, res, next) {

    /**
     * Client side code will send five parameters
     * 1) Product ID
     * 2) Product Name
     * 3) Product Weight
     * 4) Product Price
     * 5) Company ID
     */

    var p_id = req.body.product_id;
    var p_name = req.body.product_name;
    var p_wg = req.body.product_weight;
    var p_price = req.body.unit_price;
    var comp = req.body.companyid;

    /**
     * Creating a new product
     */

    my_models.products.create({

        product_id: p_id,
        product_name: p_name,
        product_weight: p_wg,
        unit_price: p_price,
        company_id: comp

    }).then(function (val) {
        res.status(201);
        res.send('Product Added');
    }).catch(function (err) {
        res.status(400);
        res.send('Invalid Parameters');
    });
});

/**
 * API to delete a particular product
 */

router.delete('/:product_id/delete', function (req, res, next) {

    /**
     * Client side code will send one parameters via link route
     * 1) Product ID
     */

    var product = req.params.product_id;

    /**
     * Finding all the products
     */

    my_models.products.find({
        where: {
            product_id: product
        }
    }).then(function (val) {
        if(val !== null) {

            /**
             * Deleting the product
             */

            my_models.products.destroy({
                    where: {
                        product_id: product
                    }
                }).then(function () {

                /**
                 *  Deleting the product from all branches
                 */

                my_models.branch2products.destroy({
                        where: {
                            product_id_bp: product
                        }
                    }).then(function () {
                        res.status(200);
                        res.json('Product Deleted')
                    }).catch(function () {
                        res.status(500);
                        res.json('Unable to delete Branch2Products');
                    })
                }).catch(function (proError) {
                    res.status(500);
                    res.json('Unable to delete Product');
                });
        }

        /**
         * Returning the error
         */

        else {
            res.status(204);
            res.send('No such product');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
        console.log('Enigma Paradigm: Error in users.js catch block');
    })
});

/**
 * API to edit product details
 */

router.patch('/:product_id/edit', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Product ID
     */

    var product = req.params.product_id;

    /**
     * Finding the product detail with from the given product id
     */

    my_models.products.find({
        where: {
            product_id: product
        }
    }).then(function (val) {
        if(val !== null) {

            /**
             * Editing the Product details
             */

                val.update ({
                    product_name: req.body.product_name,
                    product_weight: req.body.product_weight,
                    unit_price: req.body.unit_price

                }).then(function () {

                    /**
                     * Finding all the products in the branch
                     */

                    my_models.branch2products.findAll({
                        where: {
                            product_id_bp: product
                        },
                        attributes: ['branch_id_bp', 'product_id_bp', 'unit_price', 'product_quantity', 'id']
                    }).then(function (products) {

                        /**
                         * for each branch product update the unit price
                         */

                        products.forEach(function (prod) {
                            prod.update({
                                unit_price: req.body.unit_price
                            })
                        });

                        Promise.resolve(products);
                        res.status(200);
                        res.send('Product edited successfully');

                    }).catch(function (er55) {
                        res.status(500);
                        console.log(er55);
                        res.send('Internal Server Error, unable to edit branch2product');
                    });

                }).catch(function (err) {
                    res.status(500);
                    res.send('Internal Server Error, unable to edit product');
                });

        } else {
            res.status(204);
            res.send('No such product');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
        console.log('Enigma Paradigm: Error in users.js catch block');
    })
});

/**
 * API to display a particular product detail
 */

router.get('/:productid', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Product ID
     */

    var product = req.params.productid;

    /**
     * Finding the product
     */

    my_models.products.find({
        where: {
            product_id: product
        }
    }).then(function (val) {

        /**
         * returning the product detail
         */

        if(val !== null) {
            res.status(200);
            res.send(val);
        } else {
            res.status(204);
            res.send('No such product');
        }

    }).catch(function (err) {
        res.status(400);
        res.send('Invalid Product ID');
        console.log('Enigma Paradigm: Error in products.js catch block');
    })
});

module.exports = router;