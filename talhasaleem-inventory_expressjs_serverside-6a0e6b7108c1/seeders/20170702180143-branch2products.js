'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('branch2products', [{
            branch_id_bp: 1,
            product_id_bp: 1,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 1,
            product_id_bp: 2,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 1,
            product_id_bp: 3,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 2,
            product_id_bp: 1,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 2,
            product_id_bp: 3,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 2,
            product_id_bp: 5,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 3,
            product_id_bp: 2,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 3,
            product_id_bp: 4,
            unit_price: 200.0,
            product_quantity: 5
        },{
            branch_id_bp: 3,
            product_id_bp: 7,
            unit_price: 200.0,
            product_quantity: 5
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('branch2products', null, {});
    }
};