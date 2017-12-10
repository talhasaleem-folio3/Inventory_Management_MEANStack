'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('invoices', {
            invoice_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            invoice_date: {
                allowNull: false,
                type: Sequelize.STRING
            },
            total_price: {
                allowNull: false,
                type: Sequelize.DOUBLE
            },
            total_item: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        return queryInterface.dropTable('invoices');
    }
};