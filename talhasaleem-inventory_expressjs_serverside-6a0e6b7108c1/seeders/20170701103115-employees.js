'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('employees', [{
            username: "talhasaleem",
            password: "12345",
            first_name: "Talha",
            last_name: "Saleem",
            designation: "CEO",
            salary: 50000,
            sales: 0,
            branch_id: 0
        },{
            username: "owaisuddin",
            password: "12345",
            first_name: "Owais",
            last_name: "Uddin",
            designation: "CEO",
            salary: 50000,
            sales: 0,
            branch_id: 0
        },{
            username: "owaiskarni",
            password: "12345",
            first_name: "Owais",
            last_name: "Karni",
            designation: "CEO",
            salary: 50000,
            sales: 0,
            branch_id: 0
        },{
            username: "alimurtaza",
            password: "54321",
            first_name: "Ali",
            last_name: "Murtaza",
            designation: "Manager",
            salary: 25000,
            sales: 0,
            branch_id: 1
        },{
            username: "nasirtouheed",
            password: "54321",
            first_name: "Nasir",
            last_name: "Touheed",
            designation: "Manager",
            salary: 25000,
            sales: 0,
            branch_id: 2
        },{
            username: "zaidali",
            password: "54321",
            first_name: "Zaid",
            last_name: "Ali",
            designation: "Manager",
            salary: 25000,
            sales: 0,
            branch_id: 3
        },{
            username: "shabbirahmed",
            password: "67890",
            first_name: "Shabbir",
            last_name: "Ahmed",
            designation: "Employee",
            salary: 15000,
            sales: 0,
            branch_id: 1
        },{
            username: "ahmedali",
            password: "67890",
            first_name: "Ahmed",
            last_name: "Ali",
            designation: "Employee",
            salary: 15000,
            sales: 0,
            branch_id: 2
        },{
            username: "khurramiqbal",
            password: "67890",
            first_name: "Khurram",
            last_name: "Iqbal",
            designation: "Employee",
            salary: 15000,
            sales: 0,
            branch_id: 3
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('employees', null, {});
    }
};
