'use strict';
module.exports = function (sequelize, DataTypes) {
    var accounts = sequelize.define('accounts', {
        account_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cash: {
            allowNull: false,
            type: DataTypes.DOUBLE
        }
    }, {
        classMethods: {
            associate: function (models) {
                accounts.belongsTo(models.branch, {
                    foreignKey: 'account_id',
                    as: 'branch'
                });
            }
        },
        force:true,
        timestamps: false
    });
    return accounts;
};