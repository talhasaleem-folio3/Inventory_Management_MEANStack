'use strict';
module.exports = function (sequelize, DataTypes) {
    var branch = sequelize.define('branch', {
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        branch_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        branch_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        branch_address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        accounts_id: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here

                branch.hasMany(models.employees, {
                    foreignKey: 'branch_id',
                    as: 'employees'
                });

                branch.hasMany(models.invoice, {
                    foreignKey: 'branch_id',
                    as: 'invoice'
                });

                branch.hasMany(models.stock_order, {
                    foreignKey: 'branch_id',
                    as: 'order'
                });

                branch.belongsTo(models.accounts, {
                    foreignKey: 'accounts_id',
                    as: 'account'
                });

                branch.belongsToMany(models.company, {
                    through: {
                        model: models.branch2company,
                        foreignKey: 'branch_id_bc',
                        as: 'company'
                    }
                });

                branch.belongsToMany(models.products, {
                    through: {
                        model: models.branch2products,
                        foreignKey: 'branch_id_bp',
                        as: 'product'
                    }
                });
            }
        },
        force:true,
        timestamps:false
    });
    return branch;
};