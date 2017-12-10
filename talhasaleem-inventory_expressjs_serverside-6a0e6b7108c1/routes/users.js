var express = require('express');
var employ = require('../models/index');
var router = express.Router();

/**
 * API to display all the employees
 */

router.post('/', function (req, res, next) {

    /**
     * Client side code will send one parameter
     * 1) Branch Id
     */

    var b_id = req.body.branch_id;

    /**
     * If call from super user then return all employees
     */

    if (b_id === 0) {
        employ.employees.findAll()
            .then(function (val) {
                if (val !== null) {
                    res.status(200);
                    res.send(val)
                } else {
                    res.status(204);
                    res.send('No user yet');
                }

            }).catch(function (err) {
            res.status(500);
            res.send('Internal Server Error');
        });
    }

    /**
     * Else return the details of all employees in
     * a particular branch
     */

    else {
        employ.employees.findAll({
            where: {
                branch_id: b_id
            }
        }).then(function (val) {
            if (val !== null) {
                res.status(200);
                res.send(val)
            } else {
                res.status(204);
                res.send('No user yet');
            }

        }).catch(function (err) {
            res.status(400);
            res.send('Invalid Branch id');
        });
    }

});

/**
 * API to delete a particular employee
 */

router.delete('/:username/delete', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Username
     */

    var user = req.params.username;

    /**
     * Finding the employee using the given parameter
     */

    employ.employees.find({
        where: {
            username: user
        }
    }).then(function (val) {

        /**
         * Deleting the employee
         */

        if (val !== null) {
            employ.employees.destroy({
                where: {
                    username: user
                }
            }).then(function () {
                res.status(200);
                res.send('Successfully deleted');
            }).catch(function (errors) {
                res.status(500);
                res.send('Internal Server Error');
            });
        } else {
            res.status(400);
            res.send('User not found');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL, wrong username');
    })
});

/**
 * API to edit a particular employee
 */

router.patch('/:username/edit', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Username
     */

    /**
     * Client side code will send five parameters
     *
     * 1) First Name
     * 2) Last Name
     * 3) Designation
     * 4) Salary
     * 5) Sales
     */

    var user = req.params.username;

    /**
     * Finding the employee using the given parameter
     */

    employ.employees.find({
        where: {
            username: user
        }
    }).then(function (val) {
        if (val !== null) {

            /**
             * Updating the employee detail
             */

            val.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                designation: req.body.designation,
                salary: req.body.salary,
                sales: req.body.sales
            }).then(function () {
                res.status(200);
                res.send('Successfully Edited');
            }).catch(function (err) {
                res.status(500);
                res.send('Internal Server Error');
            });
        } else {
            res.status(400);
            res.send('User not found');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL, wrong username');
        console.log('Enigma Paradigm: Error in users.js catch block');
    });
});

/**
 * API to view a particular employee detail
 */

router.get('/:username', function (req, res, next) {

    /**
     * Client side code will send one parameter via link route
     * 1) Username
     */

    var user = req.params.username;

    /**
     * Finding the employee using the given parameter
     */

    employ.employees.find({
        where: {
            username: user
        }
    }).then(function (val) {
        if (val !== null) {

            /**
             * Sending the employee detail
             */

            res.status(200);
            res.send(val);
        } else {
            res.status(204);
            res.send('No such user exist');
        }

    }).catch(function (err) {
        res.status(404);
        res.send('Invalid URL');
    })

});

module.exports = router;
