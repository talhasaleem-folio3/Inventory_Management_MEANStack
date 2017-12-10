var express = require('express');
var employ = require('../models');
var jwt = require('jsonwebtoken');
var router = express.Router();

/**
 * API for login that returns a JWT Token
 */

router.post('/', function(req, res, next) {

    /**
     * Client side code will send five parameters
     * 1) Username
     * 2) Password
     */

    var user = req.body.username;
    var pass = req.body.password;

    /**
     * Finding the employee
     */

    employ.employees.find({
        where: {
            username:user
        }
    }).then(function (val) {

        /**
         * Checking the username and password
         */

        if(val !== null) {
            if(val.username === user && val.password === pass) {
                res.status(200);

                /**
                 * Creating the JWT Token
                 */

                var myToken = jwt.sign(
                    {
                        val: val
                    },
                    'enigmaparadigm'
                );
                res.json(myToken);
            }
            else {
                res.status(400);
                res.send('Invalid Username or Password');
            }
        } else {
            res.status(404);
            res.send("User doesn't exist");
        }

    }).catch(function (err) {
        res.status(204);
        res.json('No such username');
    })

});

module.exports = router;
