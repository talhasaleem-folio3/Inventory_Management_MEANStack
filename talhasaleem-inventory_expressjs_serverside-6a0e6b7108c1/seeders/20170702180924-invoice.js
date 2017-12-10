'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('invoices', [{
            invoice_id: 1,
            invoice_date: '29/9/2017',
            total_price: 5000.0,
            total_item: 23,
            branch_id: 1
        },{
            invoice_id: 2,
            invoice_date: '29/9/2017',
            total_price: 3450.0,
            total_item: 28,
            branch_id: 1
        },{
            invoice_id: 3,
            invoice_date: '29/9/2017',
            total_price: 24000.0,
            total_item: 39,
            branch_id: 1
        },{
            invoice_id: 4,
            invoice_date: '29/9/2017',
            total_price: 5000.0,
            total_item: 23,
            branch_id: 2
        },{
            invoice_id: 5,
            invoice_date: '29/9/2017',
            total_price: 3450.0,
            total_item: 28,
            branch_id: 2
        },{
            invoice_id: 6,
            invoice_date: '29/9/2017',
            total_price: 24000.0,
            total_item: 39,
            branch_id: 2
        },{
            invoice_id: 7,
            invoice_date: '29/9/2017',
            total_price: 5000.0,
            total_item: 23,
            branch_id: 3
        },{
            invoice_id: 8,
            invoice_date: '29/9/2017',
            total_price: 3450.0,
            total_item: 28,
            branch_id: 3
        },{
            invoice_id: 9,
            invoice_date: '29/9/2017',
            total_price: 24000.0,
            total_item: 39,
            branch_id: 3
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('invoices', null, {});
    }
};