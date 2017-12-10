'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('branches', {
            branch_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            branch_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            branch_phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            branch_address: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            accounts_id: {
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('branches');
    }
};