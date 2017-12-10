'use strict';
module.exports = function (sequelize, DataTypes) {
    var order2products = sequelize.define('order2products', {
        order_id_op: DataTypes.INTEGER,
        product_id_op: DataTypes.INTEGER,
        unit_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        },
        force:true,
        timestamps: false
    });
    return order2products;
};