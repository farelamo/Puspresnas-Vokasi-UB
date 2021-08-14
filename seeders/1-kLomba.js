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

     return queryInterface.bulkInsert('kategori_lomba',
     [
       {
        kategori: 'Teknologi'
       },
       {
        kategori: 'Design'
       },
       {
         kategori: 'Wirausaha'
       },
       {
         kategori: 'Public Relation'
       }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('kategori_konten', [{
      kategori: 'Teknologi',
      kategori: 'Design',
      kategori: 'Wirausaha',
      kategori: 'Public Relation'
    }])
  }
};
