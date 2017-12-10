'use strict';
module.exports = function (sequelize, DataTypes) {
    var invoice = sequelize.define('invoice', {
        invoice_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        invoice_date: {
            allowNull: false,
            type: DataTypes.STRING
        },
        total_price: {
            allowNull: false,
            type: DataTypes.DOUBLE
        },
        total_item: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        branch_id: {
            type: DataTypes.INTEGER
        }
    }, {

        classMethods: {
            associate: function (models) {
                invoice.belongsTo(models.branch, {
                    foreignKey: 'branch_id',
                    as: 'branch'
                });

                invoice.belongsToMany(models.products, {
                    through: {
                        model: models.invoice2products,
                        foreignKey: 'invoice_id_ip',
                        as: 'products'
                    }
                });
            }
        },
        force:true,
        timestamps: false
    });
    return invoice;
};