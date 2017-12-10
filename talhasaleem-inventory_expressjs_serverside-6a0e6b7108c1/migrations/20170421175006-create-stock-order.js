'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('stock_orders', {
            order_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            total_price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            branch_id: {
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('stock_orders');
    }
};