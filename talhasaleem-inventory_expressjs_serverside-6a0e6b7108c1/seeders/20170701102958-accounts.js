'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('accounts', [{
          account_id: 1,
          cash: 500000
      },{
          account_id: 2,
          cash: 255000
      },{
          account_id: 3,
          cash: 505780
      },{
          account_id: 4,
          cash: 123760
      },{
          account_id: 5,
          cash: 600000
      },{
          account_id: 6,
          cash: 340000
      },{
          account_id: 7,
          cash: 500343
      },{
          account_id: 8,
          cash: 896314
      },{
          account_id: 9,
          cash: 785413
      },{
          account_id: 10,
          cash: 103280
      }], {});

  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('accounts', null, {});
  }
};
