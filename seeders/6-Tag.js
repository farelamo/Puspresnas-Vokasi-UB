'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('tag', 
   [
     {
      tag_lomba_id: '1',
      jenis_lomba_id: '1'
     },
     {
      tag_lomba_id: '2',
      jenis_lomba_id: '1'
     },
     {
      tag_lomba_id: '3',
      jenis_lomba_id: '1'
     }
   ],
   {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
