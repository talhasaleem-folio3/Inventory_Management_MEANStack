var express = require('express');
var my_models = require('../models');
var router = express.Router();


/**
 * API to display all Accounts
 */

router.post('/', function (req, res, next) {

    /**
     * Branch ID
     */
    var branch = req.body.branch_id;

    /**
     * If Branch id is 0 then its a Super User request
     */

    if (branch === 0) {

        /**
         * Display all the accounts for Super User
         */

        my_models.accounts.findAll()
            .then(function (val) {
                if (val !== null) {
                    res.status(200);    // Success
                    res.send(val);
                }
                else {
                    res.status(204); // No Content
                    res.send('No accounts available');
                }
            }).catch(function (err) {
            res.status(500);    // Internal Server Error
            res.send('Internal Server Error: ' + 500);
        });
    }

    /**
     * Else Branch Id (other than 0) will display the account
     * associated with that branch
     */

    else {

        /**
         * Checking that if the given branch exist or not
         */

        my_models.branch.find({
            where: {
                branch_id: branch
            }
        }).then(function (val) {

            /**
             * If the branch truly exist then find the account of that branch
             */

            my_models.accounts.find({
                where: {
                    account_id: val.accounts_id
                }
            }).then(function (val2) {

                /**
                 * If such account truly exist then return Account details
                 */

                if (val2 !== null) {
                    res.status(200);    // Success
                    res.send(val2);
                }
                else {
                    res.status(204);    // No Content
                    res.send('No accounts available');
                }
            }).catch(function (err) {
                res.status(400);    // Bad Request
                res.send('No Such Account Exist');
            });
        }).catch(function (err) {
            res.status(400);    // Bad Request
            console.log(err);
            res.send('No Such Branch Exist');
        });
    }

});

/**
 * API to create Account
 */

router.post('/create', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Account ID
     * 2) Cash
     */

    var a_id = req.body.account_id;
    var cash = req.body.cash;

    /**
     * The following code will create and account with the given parameters
     */

    my_models.accounts.create({
        account_id: a_id,
        cash: cash
    }).then(function () {
        res.status(201);     // Created
        res.send('Account Created');
    }).catch(function (err) {
        res.status(400);     // Bad Request
        res.send('No Such Account Exist');
    });
});

/**
 * API to Add Cash
 */

router.post('/addcash', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Account ID
     * 2) Cash
     */

    var a_id = req.body.account_id;
    var cash = req.body.cash;

    /**
     * Checking that if the given account exist or not
     */

    my_models.accounts.find({
        where: {
            account_id: a_id
        }
    }).then(function (val) {

        /**
         * If such account truly exist then update cash
         */

        if (val !== null) {
            val.update({
                cash: (val.cash + cash)
            }).then(function () {
                res.status(200);    // Success
                res.send('Cash Deposited');
            }).catch(function (err) {
                res.status(500);    // Internal Server Error
                res.send('Internal Server Error: Unable to Add Cash');
            });
        }

        /**
         * Else return error
         */

        else {
            res.status(500);    // Interval Server Error
            res.send('Internal Server Error');
        }
    }).catch(function (err) {
        res.status(400);    // Bad Request
        console.log(err);
        res.send('No Such Account Exist');
    })
});

/**
 * API to withdraw cash
 */

router.post('/withdrawcash', function (req, res, next) {

    /**
     * Client side code will send two parameters
     * 1) Account ID
     * 2) Cash
     */

    var a_id = req.body.account_id;
    var cash = req.body.cash;

    /**
     * Checking that if the given account exist or not
     */

    my_models.accounts.find({
        where: {
            account_id: a_id
        }
    }).then(function (val) {

        /**
         * If such account truly exist then update cash
         */

        if (val !== null) {
            var amount = val.cash - cash;
            /**
             * Checking if the requested amount is deduct able or not
             */
            if (amount > 0) {

                /**
                 * Proceed updating cash
                 */

                val.update({
                    cash: amount
                }).then(function () {
                    res.status(200);    // Success
                    res.send('Withdraw Success');
                }).catch(function (err) {
                    res.status(500);    // Internal Server Error
                    res.send('Internal Server Error: Unable to Withdraw Cash');
                });

            } else {
                res.status(406);    // Not Acceptable
                res.send('No Such Amount Available to Withdraw');
            }
        }

        /**
         * Else return error
         */

        else {
            res.status(500);    // Internal Server Error
            res.send('Internal Server Error');
        }
    }).catch(function (err) {
        res.status(400);    // Bad Request
        console.log(err);
        res.send('No Such Account Available');
    })
});

/**
 * API to delete a particular account
 */

router.delete('/:account/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via route link
     * 1) Account ID
     */

    var account = req.params.account;

    /**
     * Finding the account
     */

    my_models.accounts.find({
        where: {
            account_id: account
        }
    }).then(function (val) {
        if (val !== null) {

            /**
             * Finding all the branches associated with that account
             */

            my_models.branch.findAll({
                where: {
                    accounts_id: account
                }
            }).then(function (branches) {
                if (branches !== null) {

                    /**
                     * Updating the Accounts of each branch to null
                     */

                    branches.forEach(function (branch) {
                        branch.update({
                            accounts_id: null
                        }).then(function () {

                        }).catch(function (branchErr2) {
                            res.status(500);
                            res.json('Unable to update branch');
                        });
                    });
                }
            }).catch(function (err) {
                res.status(500);
                res.send('Internal Server Error');
            });

            /**
             * Destroying that account for sure
             */

            val.destroy().then(function () {
                res.status(200);
                res.json('Account Deleted');
            }).catch(function (err2) {
                res.status(500);
                res.json('Unable to delete Account');
            });
        }
        else {
            res.status(400);
            res.json('No such Account Exist');
        }
    }).catch(function (accErr) {
        res.status(400);
        res.json('No such Account Exist');
    })
});

module.exports = router;