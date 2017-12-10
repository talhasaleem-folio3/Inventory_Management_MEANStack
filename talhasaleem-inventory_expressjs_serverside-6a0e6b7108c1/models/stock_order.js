'use strict';
module.exports = function (sequelize, DataTypes) {
    var stock_order = sequelize.define('stock_order', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        total_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        branch_id: {
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                stock_order.belongsTo(models.branch, {
                    foreignKey: 'branch_id',
                    as: 'branch'
                });

                stock_order.belongsToMany(models.products, {
                    through: {
                        model: models.order2products,
                        foreignKey: 'order_id_op',
                        as: 'products'
                    }
                });
            }
        },
        force:true,
        timestamps: false
    });
    return stock_order;
};