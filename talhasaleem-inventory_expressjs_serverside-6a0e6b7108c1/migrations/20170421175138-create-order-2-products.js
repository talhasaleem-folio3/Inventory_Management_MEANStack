'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('order2products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_id_op: {
                type: Sequelize.INTEGER
            },
            product_id_op: {
                type: Sequelize.INTEGER
            },
            unit_price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('order2products');
    }
};