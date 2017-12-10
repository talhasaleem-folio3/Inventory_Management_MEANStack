'use strict';
module.exports = function (sequelize, DataTypes) {
    var company = sequelize.define('company', {
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company_address: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                company.belongsToMany(models.branch, {
                    through: {
                        model: models.branch2company,
                        foreignKey: "company_id_bc",
                        as: 'branch'
                    }
                });

                company.hasMany(models.products, {
                    foreignKey: 'company_id',
                    as: 'products'
                });
            }
        },
        force:true,
        timestamps: false
    });
    return company;
};