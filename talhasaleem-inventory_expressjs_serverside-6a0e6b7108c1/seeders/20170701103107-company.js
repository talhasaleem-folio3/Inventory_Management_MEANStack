'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('companies', [{
            company_id: 1,
            company_name: "Nestle",
            company_phone: "1234567890",
            company_address: "Super Highway, Karachi"
        },{
            company_id: 2,
            company_name: "Hilal",
            company_phone: "1234567890",
            company_address: "Super Highway, Karachi"
        },{
            company_id: 3,
            company_name: "P&G",
            company_phone: "1234567890",
            company_address: "Super Highway, Karachi"
        },{
            company_id: 4,
            company_name: "Dettol Pakistan",
            company_phone: "1234567890",
            company_address: "Super Highway, Karachi"
        },{
            company_id: 5,
            company_name: "Nationals",
            company_phone: "1234567890",
            company_address: "Super Highway, Karachi"
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('companies', null, {});
    }
};
