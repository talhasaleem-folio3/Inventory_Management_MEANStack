'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('products', {
            product_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            product_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            product_weight: {
                allowNull: false,
                type: Sequelize.STRING
            },
            unit_price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            company_id: {
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('products');
    }
};