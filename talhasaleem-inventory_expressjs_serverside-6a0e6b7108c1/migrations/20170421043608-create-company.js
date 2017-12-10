'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('companies', {
            company_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            company_name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            company_phone: {
                allowNull: false,
                type: Sequelize.STRING
            },
            company_address: {
                allowNull: false,
                type: Sequelize.TEXT
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('companies');
    }
};