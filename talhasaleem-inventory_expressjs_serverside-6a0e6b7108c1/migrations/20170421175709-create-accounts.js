'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('accounts', {
            account_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cash: {
                allowNull: false,
                type: Sequelize.DOUBLE
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('accounts');
    }
};