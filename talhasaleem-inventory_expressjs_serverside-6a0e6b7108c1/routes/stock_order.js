var express = require('express');
var my_models = require('../models');
var router = express.Router();
var sequelize = require('sequelize');

/**
 * API to Order Stock
 */

router.post('/order', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Branch Id
     */

    var b_id = req.body.branch_id;
    var account;

    /**
     * Retrieving Accounts Id from Branch
     */

    my_models.branch.find({
        where: {
            branch_id: b_id
        }
    }).then(function (val) {
        account = val.accounts_id;

        var o_id = req.body.order_id;
        var products = req.body.products;
        var total_product_quantity = req.body.total_quantity;

        /** The coming product array will have
         * 1) product id
         * 2) quantity
         * 3) unit price
         * 4) total price
         */

        var total_prc = 0;

        /**
         * Calculating total price
         */

        for (var i = 0; i < products.length; i++) {
            total_prc = total_prc + products[i].total_price;
        }

        /**
         * Finding the account associate with the branch
         */

        my_models.accounts.find({
            where: {
                account_id: account
            }
        }).then(function (val) {

            /**
             * Checking if total price is less than Account cash
             */

            if (total_prc < val.cash) {
                products.forEach(function (i) {

                    /**
                     * For each Product find the branch2company
                     */

                    my_models.products.find({
                        where: {
                            product_id: i.product_id
                        }
                    }).then(function (productFound) {
                        if (productFound !== null) {
                            my_models.branch2company.find({
                                where: {
                                    branch_id_bc: b_id,
                                    company_id_bc: productFound.company_id
                                },
                                attributes: ['branch_id_bc', 'company_id_bc']
                            }).then(function (company) {
                                if (company !== null) {

                                    /**
                                     * Inserting into Invoice2Product table
                                     */

                                    my_models.sequelize.query('INSERT INTO order2products ' +
                                        '(order_id_op, product_id_op, unit_price, quantity) ' +
                                        'VALUES (:o_id, :p_id, :up, :qty)', {
                                        replacements: {
                                            o_id: o_id,
                                            p_id: i.product_id,
                                            up: i.unit_price,
                                            qty: i.quantity
                                        },
                                        type: sequelize.QueryTypes.INSERT
                                    }).then(function (val) {

                                    }).catch(function (err) {
                                        res.status(400);
                                        res.send('Invalid parameters of order2products');
                                    })
                                } else {
                                    res.status(400);
                                    res.json('Please add Company First');
                                }
                            }).catch(function (b2c) {
                                res.status(500);
                                res.json('Branch2Company error');
                                console.log(b2c);
                            });
                        } else {
                            res.status(404);
                            res.json('Product Not Found');
                        }
                    }).catch(function (prErr) {
                        res.status(500);
                        res.json('Product error');
                        console.log(prErr);
                    });
                });

                Promise.resolve(products);

                /**
                 * Finding the account from the given account id
                 */

                my_models.accounts.find({
                    where: {
                        account_id: account
                    }
                }).then(function (val) {

                    /**
                     * Update Cash
                     */

                    val.update({
                        cash: (val.cash - total_prc)
                    }).then(function () {

                        /**
                         * For each Product loop through to find product detail
                         */

                        products.forEach(function (j) {
                            my_models.products.find({
                                where: {
                                    product_id: j.product_id
                                }
                            }).then(function (myproduct) {

                                /**
                                 *  Updating the product unit price
                                 */

                                myproduct.update({
                                    unit_price: j.unit_price
                                }).then(function () {

                                }).catch(function (rr) {
                                    res.status(500);
                                    res.send('unable to update product unit price');
                                    console.log(rr);
                                });
                            }).catch(function (err) {
                                res.status(500);
                                res.send('Unable to update products');
                                console.log(err);
                            });

                            /**
                             * Finding branch2products and then updating
                             * the product quantity and unit price
                             */

                            my_models.branch2products.find({
                                where: {
                                    branch_id_bp: b_id,
                                    product_id_bp: j.product_id
                                },
                                attributes: ['branch_id_bp', 'product_id_bp', 'id', 'unit_price', 'product_quantity']
                            }).then(function (b2pp) {
                                b2pp.update({
                                    product_quantity: (b2pp.product_quantity + j.quantity),
                                    unit_price: j.unit_price
                                }).then(function () {

                                }).catch(function (rr) {
                                    res.status(500);
                                    res.send('unable to update branch2product unit price');
                                    console.log(rr);
                                })
                            }).catch(function (err) {
                                res.status(500);
                                res.send('Unable to find branch2products');
                                console.log(err);
                            });
                        });

                        /**
                         * Creating the stock order
                         */

                        my_models.stock_order.create({
                            order_id: o_id,
                            quantity: total_product_quantity,
                            total_price: total_prc,
                            branch_id: b_id
                        }).then(function () {
                            res.status(200);
                            res.send('Order Successful');
                        }).catch(function (mtr) {
                            res.status(500);
                            res.send("Unable to order stock");
                            console.log(mtr);
                        });
                    }).catch(function (err) {
                        res.status(500);
                        res.send("Unable to update account's cash");
                        console.log(err);
                    });
                }).catch(function (err) {
                    res.status(400);
                    res.send('Cannot find such account');
                    console.log(err);
                });
            } else {
                res.status(400);
                res.send('Not enough cash to place order');
            }
        }).catch(function (err) {
            res.status(400);
            res.send('No such account');
            console.log(err);
        });


    }).catch(function (accountsErr) {
        res.status(400);
        res.send('No Branch exist.');
    });


});

/**
 * API to View Stock Orders
 */

router.post('/view_orders', function (req, res, next) {

    /**
     * Client side code will send one parameter
     * 1) Branch Id
     */

    var b_id = req.body.branch_id;

    /**
     * If branch ID is 0 then return all the stock orders
     */

    if (b_id === 0) {

        my_models.stock_order.findAll()
            .then(function (val) {
                res.status(200);
                res.send(val);
            }).catch(function (err) {
            res.status(500);
            res.send('Internal Server Error');
        });

    }

    /**
     * Else return all the stock orders of a particular Branch
     */

    else {
        my_models.stock_order.findAll({
            where: {
                branch_id: b_id
            }
        }).then(function (val) {
            res.status(200);
            res.send(val);
        }).catch(function (err) {
            res.status(500);
            res.send('Internal Server Error');
        });

    }
});

/**
 * API to delete all Stock Orders
 */

router.delete('/view_orders/delete_all', function (req, res, next) {

    /**
     * Deleting all the stock orders
     */

    my_models.stock_order.destroy()
        .then(function () {
            res.status(200);
            res.send('All Orders deleted');
        }).catch(function (err) {
        res.status(500);
        res.send('Internal Server Error');
    })
});

/**
 * API to delete a particular Stock Order
 */

router.delete('/view_orders/:orderid/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Order ID
     */


    /**
     * Deleting the specific stock order
     */

    my_models.stock_order.destroy({
        where: {
            order_id: req.params.orderid
        }
    }).then(function () {
        res.status(200);
        res.send('Order Deleted');
    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL, No such order exist');
    })
});

/**
 * API to view a particular Stock Order
 */

router.get('/view_orders/:orderid', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Order ID
     */

    var o_id = req.params.orderid;
    var order_detail = [];

    /**
     * Finding all the products of that order
     */

    my_models.order2products.findAll({
        where: {
            order_id_op: o_id
        },
        attributes: ['order_id_op', 'product_id_op', 'quantity', 'unit_price']
    }).then(function (ord2pro) {
        if (ord2pro !== null) {

            /**
             * For each order to product find product details
             */

            ord2pro.forEach(function (order_det, index) {
                my_models.products.find({
                    where: {
                        product_id: order_det.product_id_op
                    }
                }).then(function (product) {
                    if (product !== null) {

                        /**
                         * Finding stock order with the given order id
                         */

                        my_models.stock_order.find({
                            where: {
                                order_id: o_id
                            }
                        }).then(function (ord) {
                            if (ord !== null) {

                                var detail = {
                                    product_id: product.product_id,
                                    product_name: product.product_name,
                                    product_unit_price: order_det.unit_price,
                                    product_quantity: order_det.quantity,
                                    product_total_price: (order_det.unit_price * order_det.quantity)
                                };
                                order_detail.push(detail);

                                /**
                                 * Sending order details
                                 */

                                setTimeout(function () {
                                    if (ord2pro.length === (index + 1)) {

                                        var orders = {
                                            order: order_detail,
                                            stock_price: ord.total_price,
                                            stock_items: ord.quantity
                                        };
                                        res.status(200);
                                        res.json(orders);
                                    }
                                }, 100);
                            }

                        }).catch(function (invErr) {
                            res.status(500);
                            res.json('Internal Server Error');
                            console.log(invErr);
                        });
                    }
                    else {
                        res.status(204);
                        res.json('No such product available.');
                    }
                }).catch(function (proErr) {
                    res.status(500);
                    res.json('Internal Server Error');
                    console.log(proErr);
                });


            });

        } else {
            res.status(204);
            res.json('No such Product available.');
        }
    }).catch(function (ipErr) {
        res.status(500);
        res.json('Internal Server Error');
        console.log(ipErr);
    });

});

module.exports = router;
