'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {

        return queryInterface.bulkInsert('branch2companies', [{
            branch_id_bc: 1,
            company_id_bc: 1
        },{
            branch_id_bc: 1,
            company_id_bc: 2
        },{
            branch_id_bc: 1,
            company_id_bc: 3
        },{
            branch_id_bc: 1,
            company_id_bc: 4
        },{
            branch_id_bc: 2,
            company_id_bc: 1
        },{
            branch_id_bc: 2,
            company_id_bc: 3
        },{
            branch_id_bc: 2,
            company_id_bc: 4
        }, {
            branch_id_bc: 3,
            company_id_bc: 1
        },{
            branch_id_bc: 3,
            company_id_bc: 2
        },{
            branch_id_bc: 3,
            company_id_bc: 4
        }], {});

    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('branch2companies', null, {});
    }
};
