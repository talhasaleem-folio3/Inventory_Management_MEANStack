'use strict';
module.exports = function (sequelize, DataTypes) {
    var invoice2products = sequelize.define('invoice2products', {
        invoice_id_ip: {
            type: DataTypes.INTEGER
        },
        product_id_ip: {
            type: DataTypes.INTEGER
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        unit_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
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
    return invoice2products;
};