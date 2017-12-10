'use strict';
module.exports = function (sequelize, DataTypes) {
    var branch2products = sequelize.define('branch2products', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        branch_id_bp: DataTypes.INTEGER,
        product_id_bp: DataTypes.INTEGER,
        unit_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        product_quantity: {
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
    return branch2products;
};