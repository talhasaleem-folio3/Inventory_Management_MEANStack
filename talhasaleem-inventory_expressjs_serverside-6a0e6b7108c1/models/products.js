'use strict';
module.exports = function (sequelize, DataTypes) {
    var products = sequelize.define('products', {
        product_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        product_name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        product_weight: {
            allowNull: false,
            type: DataTypes.STRING
        },
        unit_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        company_id: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                products.belongsTo(models.company, {
                    foreignKey: 'company_id',
                    as: 'company'
                });

                products.belongsToMany(models.branch, {
                    through: {
                        model: models.branch2products,
                        foreignKey: 'product_id_bp',
                        as: 'branch'
                    }
                });

                products.belongsToMany(models.invoice, {
                    through: {
                        model: models.invoice2products,
                        foreignKey: 'product_id_ip',
                        as: 'invoice'
                    }
                });

                products.belongsToMany(models.stock_order, {
                    through: {
                        model: models.order2products,
                        foreignKey: 'product_id_op',
                        as: 'order'
                    }
                });
            }
        },
        force:true,
        timestamps: false
    });
    return products;
};