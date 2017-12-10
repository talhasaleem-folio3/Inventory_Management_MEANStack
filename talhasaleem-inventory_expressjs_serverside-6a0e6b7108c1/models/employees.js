// var bcrypt = require('bcryptjs');
'use strict';
module.exports = function (sequelize, DataTypes) {
    var employees = sequelize.define('employees', {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sales: {
            type: DataTypes.INTEGER
        },
        branch_id: {
            type: DataTypes.INTEGER
        }

    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                employees.belongsTo(models.branch, {
                    foreignKey: 'branch_id',
                    as: "branch"
                })
            }
        },
        force:true,
        timestamps: false

        // hooks: {
        //     afterValidate: function(user) {
        //         employees.password = bcrypt.hashSync(employees.password, 8);
        //     }
        // }
    });
    return employees;
};