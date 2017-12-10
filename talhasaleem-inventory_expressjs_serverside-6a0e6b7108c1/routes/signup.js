var express = require('express');
var employ = require('../models');
var router = express.Router();

/**
 * API to Add Users
 */

router.post('/', function (req, res, next) {

    /**
     * Client side code will send seven parameters
     * 1) Username
     * 2) Password
     * 3) First Name
     * 4) Last Name
     * 5) Designation
     * 6) Salary
     * 7) Sales
     * 8) Branch ID
     */

    var user = req.body.username;
    var pass = req.body.password;
    var f_name = req.body.first_name;
    var l_name = req.body.last_name;
    var design = req.body.designation;
    var sal = req.body.salary;
    var sales = req.body.sales;
    var branch = req.body.branchid;

    /**
     * if branch id is 0, then its a request to create a super user
     */

    if (branch === 0) {

        /**
         * Creating an employee and signing him up
         */

        employ.employees.create({
            username: user,
            password: pass,
            first_name: f_name,
            last_name: l_name,
            designation: design,
            salary: sal,
            sales: sales,
            branch_id: branch
        }).then(function () {
            res.status(201);
            console.log('Inserted');
            res.send('User Created');
        }).catch(function (err) {
            console.log('We have an error Talha!!\nError: ', err);
            res.status(400);
            res.json('Invalid Parameters');
        });
    }

    else {

        /**
         * Finding the branch if exist
         */

        employ.branch.find({
            where: {
                branch_id: branch
            }
        }).then(function (val) {

            if (val !== null) {

                /**
                 * Creating an employee and signing him up
                 */

                employ.employees.create({
                    username: user,
                    password: pass,
                    first_name: f_name,
                    last_name: l_name,
                    designation: design,
                    salary: sal,
                    sales: sales,
                    branch_id: branch
                }).then(function () {
                    res.status(201);
                    console.log('Inserted');
                    res.send('User Created');
                }).catch(function (err) {
                    console.log('We have an error Talha!!\nError: ', err);
                    res.status(400);
                    res.send('Invalid Parameters');
                });
            }
            else {
                res.status(204);
                res.send('No such branch available');
            }

        }).catch(function (err) {
            res.status(400);
            res.send('Invalid Branch id');
            console.log(err);
        });
    }
});

module.exports = router;
