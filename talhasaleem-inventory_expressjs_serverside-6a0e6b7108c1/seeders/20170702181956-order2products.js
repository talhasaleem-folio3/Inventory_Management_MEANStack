'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('order2products', [{
            order_id_op: 1,
            product_id_op: 5,
            unit_price: 500.0,
            quantity: 400
        },{
            order_id_op: 2,
            product_id_op: 2,
            unit_price: 300.0,
            quantity: 400
        },{
            order_id_op: 3,
            product_id_op: 6,
            unit_price: 400.0,
            quantity: 400
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('order2products', null, {});
    }
};