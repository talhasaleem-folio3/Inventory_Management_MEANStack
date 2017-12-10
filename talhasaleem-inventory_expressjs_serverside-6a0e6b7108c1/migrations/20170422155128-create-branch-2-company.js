'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        queryInterface.createTable('branch2companies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            branch_id_bc: {
                type: Sequelize.INTEGER
            },
            company_id_bc: {
                type: Sequelize.INTEGER
            }
        }, {
            force:true,
            timestamps: false
        });
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('branch2companies');
    }
};