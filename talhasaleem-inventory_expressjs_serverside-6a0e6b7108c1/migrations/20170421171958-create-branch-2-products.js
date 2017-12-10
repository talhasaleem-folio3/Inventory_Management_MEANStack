'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('branch2products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            branch_id_bp: {
                type: Sequelize.INTEGER
            },
            product_id_bp: {
                type: Sequelize.INTEGER
            },
            unit_price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            product_quantity: {
                allowNull: false,
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('branch2products');
    }
};