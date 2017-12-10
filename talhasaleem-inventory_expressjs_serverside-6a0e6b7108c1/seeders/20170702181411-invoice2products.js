'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('invoice2products', [{
            invoice_id_ip: 1,
            product_id_ip: 1,
            quantity: 1,
            unit_price: 200.0
        },{
            invoice_id_ip: 1,
            product_id_ip: 3,
            quantity: 2,
            unit_price: 200.0
        },{
            invoice_id_ip: 1,
            product_id_ip: 5,
            quantity: 5,
            unit_price: 200.0
        },{
            invoice_id_ip: 2,
            product_id_ip: 2,
            quantity: 1,
            unit_price: 200.0
        },{
            invoice_id_ip: 2,
            product_id_ip: 4,
            quantity: 2,
            unit_price: 200.0
        },{
            invoice_id_ip: 2,
            product_id_ip: 6,
            quantity: 5,
            unit_price: 200.0
        },{
            invoice_id_ip: 3,
            product_id_ip: 8,
            quantity: 1,
            unit_price: 200.0
        },{
            invoice_id_ip: 3,
            product_id_ip: 9,
            quantity: 2,
            unit_price: 200.0
        },{
            invoice_id_ip: 3,
            product_id_ip: 7,
            quantity: 5,
            unit_price: 200.0
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('invoice2products', null, {});
    }
};