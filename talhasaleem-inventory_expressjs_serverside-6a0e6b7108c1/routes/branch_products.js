var express = require('express');
var my_models = require('../models');
var router = express.Router();

/**
 * API to display the company  products of a particular branch
 */

router.post('/', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Company ID
     * 2) Branch ID
     */

    var b_id = req.body.branch_id;
    var c_id = req.body.company_id;
    var detail = [];

    /**
     * Finding the all products with the given parameter of Branch
     */

    my_models.branch2products.findAll({
        where: {
            branch_id_bp: b_id
        },
        attributes: [
            'branch_id_bp',
            'product_id_bp',
            'unit_price',
            'product_quantity'
        ]
    }).then(function (products) {

        /**
         * Looping through the Branch2Products table
         */

        products.forEach(function (pro, index) {

            /**
             * For each products push the details of
             * the product into the details[] array
             */

            my_models.products.find({
                where: {
                    product_id: pro.product_id_bp,
                    company_id: c_id
                }
            }).then(function (productDetail) {
                if(productDetail !== null) {

                    /**
                     * The value json type contain the following parameters
                     *
                     * 1) Product ID
                     * 2) Product Name
                     * 3) Product Weight
                     * 4) Unit Price
                     * 5) Product Quantity
                     * 6) Company ID
                     */

                    var value = {
                        product_id: productDetail.product_id,
                        product_name: productDetail.product_name,
                        product_weight: productDetail.product_weight,
                        unit_price: productDetail.unit_price,
                        product_quantity: pro.product_quantity,
                        company_id: productDetail.company_id
                    };
                    detail.push(value);
                }

                setTimeout(function () {
                    if(products.length === (index + 1)) {
                        res.status(200);
                        res.json(detail);
                    }
                }, 200);

            }).catch(function (proErr) {
                res.status(500);
                res.json('Cannot find product id');
                console.log(proErr);
            });
        });

    }).catch(function (err) {
        res.status(400);
        res.send(err)
    });
});

/**
 * API to add the company products of a particular branch
 */

router.post('/addproduct', function (req, res, next) {

    /**
     * Client side code will send four parameters
     * 1) Branch Id
     * 2) Company Id
     * 3) Product Price
     * 4) Product Quantity
     */

    var p_id = req.body.product_id;

    // Variable for Weak Entity filling
    var b_id = req.body.branch_id;

    var p_price = req.body.unit_price;
    var p_qty = req.body.product_quantity;

    /**
     * Adding the products into the branch
     */

    my_models.branch2products.create({

        branch_id_bp: p_id,
        product_id_bp: b_id,
        unit_price: p_price,
        product_quantity: p_qty

    }).then(function () {
        res.status(200);
        res.send('Product added');
    }).catch(function (err) {
        res.status(400);
        console.log(err);
        res.send('unable to add product');
    });
});

/**
 * API to remove the company products of a particular branch
 */

router.post('/removeproduct', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Branch Id
     * 2) Product Id
     */

    var p_id = req.body.product_id;
    var b_id = req.body.branch_id;

    /**
     * Deleting the products from the given branch
     */

    my_models.branch2products.destroy({
        where: {
            branch_id_bp: b_id,
            product_id_bp: p_id
        }
    }).then(function () {
        res.status(200);
        res.send('Product removed');
    }).catch(function (err) {
        res.status(400);
        res.send('Unable to remove product');
    })
});

module.exports = router;