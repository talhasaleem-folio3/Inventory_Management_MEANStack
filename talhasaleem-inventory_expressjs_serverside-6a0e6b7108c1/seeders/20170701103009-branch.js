'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('branches', [{
            branch_id: 1,
            branch_name: "Bahadurabad",
            branch_phone: "1234567890",
            branch_address: "Bahadurabad Chowrangi",
            accounts_id: 1
        },{
            branch_id: 2,
            branch_name: "Gulshan",
            branch_phone: "1234567890",
            branch_address: "Gulshan Chowrangi",
            accounts_id: 2
        },{
            branch_id: 3,
            branch_name: "Jauhar",
            branch_phone: "1234567890",
            branch_address: "Jauhar Chowrangi",
            accounts_id: 3
        },{
            branch_id: 4,
            branch_name: "Nazimabad",
            branch_phone: "1234567890",
            branch_address: "Nazimabad Chowrangi",
            accounts_id: 4
        },{
            branch_id: 5,
            branch_name: "Clifton",
            branch_phone: "1234567890",
            branch_address: "Teen Talwar",
            accounts_id: 5
        },{
            branch_id: 6,
            branch_name: "North Karachi",
            branch_phone: "1234567890",
            branch_address: "4k Chowrangi",
            accounts_id: 6
        },{
            branch_id: 7,
            branch_name: "Nipa",
            branch_phone: "1234567890",
            branch_address: "Nipa Chowrangi",
            accounts_id: 7
        },{
            branch_id: 8,
            branch_name: "Light House",
            branch_phone: "1234567890",
            branch_address: "Pakistan Chowk",
            accounts_id: 8
        },{
            branch_id: 9,
            branch_name: "Saddar",
            branch_phone: "1234567890",
            branch_address: "Cooperative Market",
            accounts_id: 9
        },{
            branch_id: 10,
            branch_name: "Abul Hassan Asfahani",
            branch_phone: "1234567890",
            branch_address: "Paradise Bakery",
            accounts_id: 10
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('branches', null, {});
    }
};
