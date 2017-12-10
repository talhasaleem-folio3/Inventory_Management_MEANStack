'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('employees', {

            username: {
                type: Sequelize.STRING,
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            first_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING
            },
            designation: {
                type: Sequelize.STRING,
                allowNull: false
            },
            salary: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            sales: {
                type: Sequelize.INTEGER
            },
            branch_id: {
                type: Sequelize.INTEGER,
            }
        }, {
            force:true,
            timestamps: false
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('employees');
    }
};