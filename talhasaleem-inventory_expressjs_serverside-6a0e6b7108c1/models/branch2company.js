'use strict';
module.exports = function (sequelize, DataTypes) {
    var branch2company = sequelize.define('branch2company', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        branch_id_bc: {
            type: DataTypes.INTEGER
        },
        company_id_bc: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {

        },
        force:true,
        timestamps: false
    });
    return branch2company;
};