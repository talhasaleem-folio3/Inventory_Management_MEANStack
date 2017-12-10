var express = require('express');
var mybranch = require('../models');
var companies = require('./branch_companies');
var router = express.Router();

/**
 * API to all branches
 */

router.get('/', function (req, res, next) {

    /**
     * returns all the branches
     */

    mybranch.branch.findAll()
        .then(function (val) {
            if (val !== null) {
                res.status(200);
                res.send(val);
            } else {
                res.status(204);    // No branch yet
                res.send('No branch yet');
            }
        }).catch(function (err) {
        res.status(500);
        res.send('Internal Server Error');
    })
});

/**
 * API to create branches
 */

router.post('/create', function (req, res, next) {

    /**
     * Client side code will send five parameters
     * 1) Branch Id
     * 2) Branch Name
     * 3) Branch Phone
     * 4) Branch Address
     * 5) Branch Account
     */

    var b_id = req.body.branch_id;
    var b_name = req.body.branch_name;
    var b_phn = req.body.branch_phone;
    var b_add = req.body.branch_address;
    var b_acc = req.body.accounts_id;

    /**
     * Finding the account associated with the given branch
     */

    mybranch.accounts.find({
        where: {
            account_id: b_acc
        }
    }).then(function (val) {
        if (val !== null) {

            /**
             * Now creating the branch
             */

            mybranch.branch.create({
                branch_id: b_id,
                branch_name: b_name,
                branch_phone: b_phn,
                branch_address: b_add,
                accounts_id: b_acc
            }).then(function () {
                res.status(201);
                res.send('Branch Created');
            }).catch(function (err) {
                res.status(400);
                res.send('Invalid Parameters provided');
            })
        }

        /**
         * Else return error
         */

        else {
            res.status(400);
            res.send("Account doesn't exist");
        }
    }).catch(function (err) {
        res.status(400);
        res.send("Account doesn't exist");
    });
});

/**
 * API to view branches companies
 */

router.use('/companies', companies);

/**
 * API to view a particular branches
 */

router.get('/:branchid', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Branch Id
     */

    var branch = req.params.branchid;

    /**
     * Finding the branch with the given parameter
     */

    mybranch.branch.find({
        where: {
            branch_id: branch
        }
    }).then(function (val) {

        /**
         * Returning the branch detail
         */

        if (val !== null) {
            res.status(200);
            res.send(val);
        } else {
            res.status(404);
            res.send('No such branch, invalid URL');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Branch not found: 404 Invalid URL');
        console.log('Enigma Paradigm: Error in branches.js catch block');
    });
});

/**
 * API to delete a particular branch
 */

router.delete('/:branchid/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Branch Id
     */

    var branch = req.params.branchid;

    /**
     * Finding the branch with the given parameter
     */

    mybranch.branch.find({
        where: {
            branch_id: branch
        }
    }).then(function (val) {
            if (val !== null) {

                /**
                 * Deleting all the companies that are associated
                 * with that branch
                 */

                mybranch.branch2company.destroy({
                    where: {
                        branch_id_bc: branch
                    }
                }).then(function () {
                    console.log('Branch Company Destroyed');

                    /**
                     * Deleting all the products that are associated
                     * with that branch
                     */

                    mybranch.branch2products.destroy({
                        where: {
                            branch_id_bp: branch
                        }
                    }).then(function () {
                        console.log('Branch Products Destroyed');
                    }).catch(function (b2pErr) {
                        res.status(500);
                        res.json('Unable to delete from Branch2Product');
                        console.log(b2pErr);
                    });

                }).catch(function (b2cErr) {
                    res.status(500);
                    res.json('Unable to delete from Branch2Company');
                    console.log(b2cErr);
                });


                /**
                 * Finding all the employees that are
                 * associated with that branch
                 */

                mybranch.employees.findAll({
                    where: {
                        branch_id: branch
                    }
                }).then(function (employee) {

                    /**
                     * Updating the branch status of each employee
                     * of that particular branch by looping through it
                     */

                    employee.forEach(function (emp) {

                        emp.update({
                            branch_id: null
                        }).then(function () {
                            console.log('Employee Branch status Edited');
                        }).catch(function (empEditErr) {
                            res.status(500);
                            res.json('Unable to edit employee branch detail');
                            console.log(empEditErr);
                        });
                    });

                }).catch(function (empErr) {
                    res.status(500);
                    res.json('Unable to edit employee branch status');
                    console.log(empErr);
                });


                /**
                 * Finding all the invoices of that branch
                 */

                mybranch.invoice.findAll({
                    where: {
                        branch_id: branch
                    }
                }).then(function (inv) {

                    /**
                     * Updating the branch status of each invoice
                     * of that particular branch by looping through it
                     */

                    inv.forEach(function (invoice) {

                        invoice.update({
                            branch_id: null
                        }).then(function () {
                            console.log('Branch Invoices Edited');
                        }).catch(function (invUpErr) {
                            res.status(500);
                            res.json('Unable to update branch invoice detail');
                            console.log(invUpErr);
                        });
                    });

                }).catch(function (invErr) {
                    res.status(500);
                    res.json('Unable to edit branch invoices detail');
                    console.log(invErr);
                });

                /**
                 * Finding stock orders of that branch
                 */

                mybranch.stock_order.findAll({
                    where: {
                        branch_id: branch
                    }
                }).then(function (stc) {

                    /**
                     * Updating the branch status of each stock order
                     * of that particular branch by looping through it
                     */

                    stc.forEach(function (stock) {

                        stock.update({
                            branch_id: null
                        }).then(function () {
                            console.log('Branch Stock Order Edited');
                        }).catch(function (stcUpErr) {
                            res.status(500);
                            res.json('Unable to update branch Stock Order detail');
                            console.log(stcUpErr);
                        });
                    });
                }).catch(function (stcErr) {
                    res.status(500);
                    res.json('Unable to edit branch Stock Order detail');
                    console.log(stcErr);
                });

                /**
                 * Deleting the branch
                 */

                mybranch.branch.destroy({
                    where: {
                        branch_id: branch
                    }
                }).then(function () {
                    console.log('Branch Deleted Successfully');
                    res.status(200);
                    res.json('Branch Deleted');

                }).catch(function (brrErr) {
                    res.status(500);
                    res.json('Unable delete Branch');
                    console.log(brrErr);
                });

            }
            else {
                res.status(204);
                res.send('No such branch exist');
            }

        }
    ).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
        console.log('Enigma Paradigm: Error in branches.js catch block');
    })
});

/**
 * API to edit a particular branch
 */

router.patch('/:branchid/edit', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Branch Id
     *
     * and other parameters via post request
     *
     * 1) Branch Name
     * 2) Branch Address
     * 3) Branch Phone
     */

    var branch = req.params.branchid;

    /**
     * Finding the branch with the given parameter
     */

    mybranch.branch.find({
        where: {
            branch_id: branch
        }
    }).then(function (val) {
        var account = val.accounts_id;
        if (val !== null) {

            /**
             * Finding the account of that branch
             */

            mybranch.accounts.find({
                where: {
                    account_id: req.body.accounts_id
                }
            }).then(function (acc_exist) {
                if (acc_exist !== null) {

                    /**
                     * updating branch details
                     */

                    val.update({
                        branch_name: req.body.branch_name,
                        branch_phone: req.body.branch_phone,
                        branch_address: req.body.branch_address,
                        accounts_id: req.body.accounts_id
                    }).then(function () {
                        res.status(200);
                        res.send('Branch Updated');
                    }).catch(function (err) {
                        res.status(500);
                        res.send('Internal Server Error');
                    });
                } else {
                    res.status(204);
                    res.send("account doesn't exist");
                }

            }).catch(function (err) {
                res.status(500);
                res.send("Internal Server Error");
            });
        } else {
            res.status(204);
            res.send('No such branch exist');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
        console.log('Enigma Paradigm: Error in branches.js catch block');
    })
});

module.exports = router;