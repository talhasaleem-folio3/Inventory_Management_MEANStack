var express = require('express');
var my_models = require('../models');
var router = express.Router();
var sequelize = require('sequelize');

/**
 * API to display all invoices
 */

router.get('/', function (req, res, next) {

    /**
     * Finding all the invoices
     */

    my_models.invoice.findAll()
        .then(function (val) {
            if (val !== null) {
                res.status(200);
                res.send(val);
            } else {
                res.status(204);
                res.send('No invoice yet');
            }
        }).catch(function (err) {
        res.status(500);
        res.send('Internal Server Error');
    })
});

/**
 * API to display the product name and unit price
 */

router.post('/branch_product', function (req, res, next) {

    /**
     * Client side code will send three parameters
     * 1) Branch Id
     * 2) Product Id
     * 3) Product Quantity
     */

    var p_id = req.body.product_id;
    var b_id = req.body.branch_id;
    var p_qty = req.body.product_qty;

    /**
     * Finding the products of that branch
     */

    my_models.branch2products.find({
        where: {
            branch_id_bp: b_id,
            product_id_bp: p_id
        },
        attributes: ['branch_id_bp', 'product_id_bp', 'unit_price', 'product_quantity']
    }).then(function (val) {
        if (val !== null) {

            /**
             * If that requested product quantity is less
             * than the actual quantity then proceed
             */

            if (p_qty < val.product_quantity) {

                /**
                 * Finding the product
                 */

                my_models.products.find({
                    where: {
                        product_id: p_id
                    }
                }).then(function (prods) {

                    /**
                     * Returning the branch product details
                     */

                    var productDetails = {
                        unit_price: val.unit_price,
                        product_name: prods.product_name
                    };

                    res.status(200);
                    res.json(productDetails);
                }).catch(function (prodErr) {
                    res.status(500);
                    console.log(prodErr);
                    res.json('Internal Server Error');
                });
            } else {
                res.status(400);
                res.json('Invalid Product Quantity');
            }
        } else {
            res.status(400);
            res.json('Branch2Product does not exist');
        }
    }).catch(function (err) {
        console.log(err);
        res.status(400);
        res.json('Branch2Product does not exist');

    });
});

/**
 * API to create an  invoice
 */

router.post('/create', function (req, res, next) {

    /**
     * Client side code will send seven parameters
     * 1) Invoice Id
     * 2) Date
     * 3) Branch ID
     * 4) Invoice[] Array
     * 5) Total Invoice Price
     * 6) Total Invoice Items
     * 7) Username
     */

    var i_id = req.body.invoice_id;
    var date = req.body.date;
    var b_id = req.body.branch_id;
    var myinvoice = req.body.invoice;
    var total = req.body.total_invoice_price;
    var total_items = req.body.total_invoice_items;
    var user = req.body.username;

    /**
     * invoice object array will contain
     * 1) product ids
     * 2) unit price
     * 3) quantity
     */

    /**
     * Creating invoice
     */

    my_models.invoice.create({
        invoice_id: i_id,
        invoice_date: date,
        total_price: total,
        total_item: total_items,
        branch_id: b_id
    }).then(function (val) {

        /**
         * Looping through the object array of Invoice
         * and Inserting it into Invoice to products
         */

        myinvoice.forEach(function (i) {

            my_models.sequelize.query('INSERT INTO invoice2products ' +
                '(invoice_id_ip, product_id_ip, quantity, unit_price) ' +
                'VALUES (:i_id, :p_id, :qty, :up)', {
                replacements: {
                    i_id: i_id,
                    p_id: i.productid,
                    qty: i.quantities,
                    up: i.product_unit_price
                },
                type: sequelize.QueryTypes.INSERT

            }).then(function () {

            }).catch(function (errors) {
                res.status(400);
                console.log(errors);
                res.send('Unable to create invoice2products');
            });

            /**
             * Finding products of a particular branch
             */

            my_models.branch2products.find({
                where: {
                    product_id_bp: i.productid,
                    branch_id_bp: b_id
                },
                attributes: ['branch_id_bp', 'product_id_bp', 'unit_price', 'product_quantity', 'id']
            }).then(function (pro) {

                /**
                 * updating the quantity of products in that branch
                 */

                pro.update({
                    id: pro.id,
                    product_id_bp: i.productid,
                    branch_id_bp: b_id,
                    unit_price: pro.unit_price,
                    product_quantity: (pro.product_quantity - i.quantities)
                }).then(function () {

                }).catch(function (errors2) {
                    res.status(500);
                    res.send('Internal Server Error');
                });
            }).catch(function (err4) {
                res.status(400);
                res.send('No such product id');
                console.log(err4);
            });
        });


        /**
         * Finding the employee using the given parameter
         */


        my_models.employees.find({
            where: {
                username: user
            }
        }).then(function (emp) {

            /**
             * Updating the Sales of employee
             */

            emp.update({
                sales: (emp.sales + total)
            }).then(function () {

                /**
                 * Finding the branch
                 */

                my_models.branch.find({
                    where: {
                        branch_id: b_id
                    }
                }).then(function (bran) {

                    /**
                     * Finding the account of that branch
                     */

                    my_models.accounts.find({

                        where: {
                            account_id: bran.accounts_id
                        }

                    }).then(function (acc) {

                        /**
                         * Updating the account's cash
                         */

                        acc.update({
                            cash: (acc.cash + total)
                        }).then(function () {
                            res.status(200);
                            res.send('Invoice created');
                        }).catch(function (ert) {
                            console.log(ert);
                            res.status(500);
                            res.send('Unable to create invoice');
                        });

                    }).catch(function (err5) {
                        res.status(400);
                        res.send('No Such Account');
                        console.log(err5);
                    });
                }).catch(function (trr) {
                    res.status(400);
                    console.log(trr);
                    res.send('No such branch');
                });

            }).catch(function (errors3) {
                res.status(500);
                res.send('Internal Server Error');
                console.log(errors3);
            });


        }).catch(function (err2) {
            res.status(400);
            res.send('No such username');
            console.log(err2);
        });
    }).catch(function (err) {
        res.status(400);
        console.log(err);
        res.send('Unable to create Invoice');
    })
});

/**
 * API to delete an invoice
 */

router.delete('/:invoiceid/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Invoice Id
     */

    i_id = req.params.invoiceid;


    /**
     * Deleting that particular invoice
     */


    my_models.invoice.destroy({
        where: {
            invoice_id: i_id
        }
    }).then(function () {

        /**
         * Deleting the products associated with that invoice id
         */

        my_models.invoice2products.destroy({
            where: {
                invoice_id_ip: i_id
            }
        }).then(function () {
            res.status(200);
            res.send('Invoice deleted');
        }).catch(function (err) {
            res.status(500);
            res.send('Unable to delete invoices');
            console.log(err);
        })
    }).catch(function (err2) {
        res.status(404);
        res.send('Invalid URL');
        console.log(err2);
    });
});

/**
 * API to edit an invoice
 */

router.patch('/edit_invoice', function (req, res, next) {

    /**
     * Client side code will send seven parameters
     * 1) Invoice Id
     * 2) Date
     * 3) Branch ID
     * 4) Invoice[] Array
     * 5) Total Invoice Price
     * 6) Total Invoice Items
     * 7) Username
     */

    var i_id = req.body.invoice_id;
    var date = req.body.date;
    var b_id = req.body.branch_id;
    var myinvoice = req.body.invoice;
    var total = req.body.total_invoice_price;
    var total_items = req.body.total_invoice_items;
    var user = req.body.username;

    /**
     * invoice object array will contain
     * 1) product ids
     * 2) unit price
     * 3) quantity
     */

    var invoice2product = [];
    var previousTotal;

    /**
     * Finding all the products associated with that
     * invoice id
     */

    my_models.invoice2products.findAll({
        where: {
            invoice_id_ip: i_id
        },
        attributes: ['invoice_id_ip', 'product_id_ip', 'quantity', 'unit_price']
    }).then(function (i2p) {
        invoice2product = i2p
    }).catch(function (i2pError) {
        res.status(400);
        res.json('Invalid paramters');
        console.log(i2pError);
    });


    /**
     * Finding the invoice
     */


    my_models.invoice.find({
        where: {
            invoice_id: i_id
        }
    }).then(function (upInvoice) {

        previousTotal = upInvoice.total_price;

        /**
         * Editing the invoice
         */

        upInvoice.update({
            invoice_date: date,
            total_price: total,
            total_item: total_items
        }).then(function () {

            var cashValue = total - previousTotal;

            myinvoice.forEach(function (i, index) {

                var updateQtyUpto;
                var cash;

                /**
                 * Checking the product quantities
                 */

                if(invoice2product[index].product_id_ip === i.productid) {
                    console.log('Inside first if');
                    if(invoice2product[index].quantity < i.quantities) {
                        updateQtyUpto = i.quantities - invoice2product[index].quantity;
                        cash = true;
                        console.log('Inside 2 if');
                    } else if(invoice2product[index].quantity === i.quantities) {
                        updateQtyUpto = i.quantities;
                        cash = null;
                        console.log('Inside 3 if');
                    } else {
                        updateQtyUpto = invoice2product[index].quantity - i.quantities;
                        cash = false;
                        console.log('Inside 4 if');
                    }
                }

                if(cash === true) {

                    /**
                     * updating invoice to products
                     */

                    my_models.sequelize.query('UPDATE invoice2products ' +
                        'SET invoice_id_ip = :i_id, product_id_ip = :p_id, quantity = :qty, unit_price = :up ' +
                        'WHERE product_id_ip = :p_id', {
                        replacements: {
                            i_id: i_id,
                            p_id: i.productid,
                            qty: i.quantities + updateQtyUpto,
                            up: i.product_unit_price
                        },
                        type: sequelize.QueryTypes.UPDATE

                    }).then(function () {

                    }).catch(function (errors) {
                        res.status(400);
                        console.log(errors);
                        res.send('Unable to create invoice2products');
                    });
                }

                /**
                 * updating invoice to products
                 */

                else if(cash === false) {
                    my_models.sequelize.query('UPDATE invoice2products ' +
                        'SET invoice_id_ip = :i_id, product_id_ip = :p_id, quantity = :qty, unit_price = :up ' +
                        'WHERE product_id_ip = :p_id', {
                        replacements: {
                            i_id: i_id,
                            p_id: i.productid,
                            qty: i.quantities - updateQtyUpto,
                            up: i.product_unit_price
                        },
                        type: sequelize.QueryTypes.UPDATE

                    }).then(function () {

                    }).catch(function (errors) {
                        res.status(400);
                        console.log(errors);
                        res.send('Unable to create invoice2products');
                    });
                }

                /**
                 * Finding all the products associated with that branch
                 */

                my_models.branch2products.find({
                    where: {
                        product_id_bp: i.productid,
                        branch_id_bp: b_id
                    },
                    attributes: ['branch_id_bp', 'product_id_bp', 'unit_price', 'product_quantity', 'id']
                }).then(function (pro) {

                    /**
                     * Updating the product quantity in that branch
                     */

                    if(cash === true) {
                        pro.update({
                            id: pro.id,
                            product_id_bp: i.productid,
                            branch_id_bp: b_id,
                            unit_price: pro.unit_price,
                            product_quantity: (pro.product_quantity - i.quantities - updateQtyUpto)
                        }).then(function () {

                        }).catch(function (errors2) {
                            res.status(500);
                            res.send('Internal Server Error');
                        });
                    } else if(cash === false) {
                        pro.update({
                            id: pro.id,
                            product_id_bp: i.productid,
                            branch_id_bp: b_id,
                            unit_price: pro.unit_price,
                            product_quantity: (pro.product_quantity - i.quantities + updateQtyUpto)
                        }).then(function () {

                        }).catch(function (errors2) {
                            res.status(500);
                            res.send('Internal Server Error');
                        });
                    }

                }).catch(function (err4) {
                    res.status(400);
                    res.send('No such product id');
                    console.log(err4);
                });
            });


            /**
             * Finding the employee from the given parameter
             */


            my_models.employees.find({
                where: {
                    username: user
                }
            }).then(function (emp) {

                /**
                 * Updating the sales of the given employee
                 */

                emp.update({
                    sales: (emp.sales + cashValue)
                }).then(function () {
                    my_models.branch.find({
                        where: {
                            branch_id: b_id
                        }
                    }).then(function (bran) {

                        /**
                         * Finding the account of that branch
                         */

                        my_models.accounts.find({

                            where: {
                                account_id: bran.accounts_id
                            }

                        }).then(function (acc) {

                            /**
                             * Updating the cash of branch's account
                             */

                            acc.update({
                                cash: (acc.cash + cashValue)
                            }).then(function () {
                                res.status(200);
                                res.send('Invoice updated');
                            }).catch(function (ert) {
                                console.log(ert);
                                res.status(500);
                                res.send('Unable to update invoice');
                            });

                        }).catch(function (err5) {
                            res.status(400);
                            res.send('No Such Account');
                            console.log(err5);
                        });
                    }).catch(function (trr) {
                        res.status(400);
                        console.log(trr);
                        res.send('No such branch');
                    });

                }).catch(function (errors3) {
                    res.status(500);
                    res.send('Internal Server Error');
                    console.log(errors3);
                });


            }).catch(function (err2) {
                res.status(400);
                res.send('No such username');
                console.log(err2);
            });
        }).catch(function (err) {
            res.status(400);
            console.log(err);
            res.send('Unable to update Invoice');
        });


    });


});

/**
 * API to display all invoices of a particular branch
 */

router.get('/:branch_invoice', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Branch Invoice
     */

    my_models.invoice.findAll({
        where: {
            branch_id: req.params.branch_invoice
        }
    }).then(function (val) {

        /**
         * Returning all the invoices of the particular branch
         */

        if (val !== null) {
            res.status(200);
            res.send(val);
        } else {
            res.status(204);
            res.send('No invoices yet');
        }
    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
    })
});

router.post('/get_invoice_detail', function (req, res, next) {

    /**
     * Product ID
     * Product Name
     * Product Unit Price
     * Product Quantity
     * Product Total Price
     *
     *
     * Total Invoice Price
     * Total Invoice Items
     */

    var i_id = req.body.invoice_id;
    var invoice_detail = [];

    /**
     * Finding all the products associated with the invoice id
     */

    my_models.invoice2products.findAll({
        where: {
            invoice_id_ip: i_id
        },
        attributes: ['invoice_id_ip', 'product_id_ip', 'quantity', 'unit_price']
    }).then(function (inv2pro) {
        if (inv2pro !== null) {

            /**
             * Looping for each Invoice2products
             */

            inv2pro.forEach(function (invoice_det, index) {
                my_models.products.find({
                    where: {
                        product_id: invoice_det.product_id_ip
                    }
                }).then(function (product) {
                    if (product !== null) {
                        my_models.invoice.find({
                            where: {
                                invoice_id: i_id
                            }
                        }).then(function (inv) {
                            if (inv !== null) {

                                /**
                                 * Setting the parameters of detail[]
                                 */

                                var detail = {
                                    product_id: product.product_id,
                                    product_name: product.product_name,
                                    product_unit_price: invoice_det.unit_price,
                                    product_quantity: invoice_det.quantity,
                                    product_total_price: (invoice_det.unit_price * invoice_det.quantity),
                                };
                                invoice_detail.push(detail);

                                setTimeout(function () {
                                    if (inv2pro.length === (index + 1)) {

                                        /**
                                         * Sending the invoice details
                                         */

                                        var invoices = {
                                            invoice: invoice_detail,
                                            invoice_price: inv.total_price,
                                            invoice_items: inv.total_item
                                        };

                                        res.status(200);
                                        res.json(invoices);
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


/**
 * API to delete all invoices
 */


router.delete('/delete_all', function (req, res, next) {

    /**
     * Deleting all the Invoice
     */

    my_models.invoice.destroy()
        .then(function () {

            /**
             * Deleting all the Invoices2products
             */

            my_models.invoice2products.destroy()
                .then(function () {
                    res.status(200);
                    res.send('All Invoices deleted');
                }).catch(function (err) {
                res.status(500);
                res.send('Unable to delete invoice2products');
                console.log(err);
            })
        }).catch(function (err2) {
        res.status(500);
        res.send('Unable to delete all invoices');
        console.log(err2);
    })
});


module.exports = router;