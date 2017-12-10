'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('stock_orders', [{
            order_id: 1,
            quantity: 5,
            total_price: 5000.0,
            branch_id: 1
        },{
            order_id: 2,
            quantity: 89,
            total_price: 86700.0,
            branch_id: 2
        },{
            order_id: 3,
            quantity: 78,
            total_price: 54666.0,
            branch_id: 3
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('stock_orders', null, {});
    }
};