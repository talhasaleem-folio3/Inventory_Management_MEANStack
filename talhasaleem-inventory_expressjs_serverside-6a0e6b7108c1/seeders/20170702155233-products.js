'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('products', [{
            product_id: 1,
            product_name: "Milk",
            product_weight: "500ml",
            unit_price: 200.0,
            company_id: 1
        },{
            product_id: 2,
            product_name: "Water",
            product_weight: "250ml",
            unit_price: 25.0,
            company_id: 1
        },{
            product_id: 3,
            product_name: "Nesfruita",
            product_weight: "10000ml",
            unit_price: 250.0,
            company_id: 1
        },{
            product_id: 4,
            product_name: "Cupcake",
            product_weight: "10gm",
            unit_price: 20.0,
            company_id: 2
        },{
            product_id: 5,
            product_name: "Chocolate Biscuits",
            product_weight: "20gm",
            unit_price: 25.0,
            company_id: 2
        },{
            product_id: 6,
            product_name: "Ding Dong Bubble",
            product_weight: "2gm",
            unit_price: 2.0,
            company_id: 2
        },{
            product_id: 7,
            product_name: "Pampers",
            product_weight: "50gm",
            unit_price: 200.0,
            company_id: 3
        },{
            product_id: 8,
            product_name: "Ariel laundry detergent",
            product_weight: "250gm",
            unit_price: 100.0,
            company_id: 3
        },{
            product_id: 9,
            product_name: "Dawn dishwashing",
            product_weight: "100gm",
            unit_price: 300.0,
            company_id: 3
        }, {
            product_id: 10,
            product_name: "Toilet Cleaner",
            product_weight: "1 liter",
            unit_price: 230.0,
            company_id: 4
        }, {
            product_id: 11,
            product_name: "Hand Sanitizer",
            product_weight: "5ml",
            unit_price: 30.0,
            company_id: 4
        }, {
            product_id: 12,
            product_name: "Hand Wash",
            product_weight: "100ml",
            unit_price: 230.0,
            company_id: 4
        }, {
            product_id: 13,
            product_name: "National Achaar-100gm",
            product_weight: "100gm",
            unit_price: 230.0,
            company_id: 5
        }, {
            product_id: 14,
            product_name: "National Achaar-250gm",
            product_weight: "250",
            unit_price: 230.0,
            company_id: 5
        }, {
            product_id: 15,
            product_name: "National Ketchep",
            product_weight: "100gm",
            unit_price: 230.0,
            company_id: 5
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('products', null, {});
    }
};