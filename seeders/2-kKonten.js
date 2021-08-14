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

     return queryInterface.bulkInsert('kategori_konten',
     [
       {
        kategori: 'Info Vokasi'
       },
       {
        kategori: 'Info Lomba'
       },
       {
         kategori: 'Tips & Trick'
       },
       {
         kategori: 'Vokasi Juara'
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
      kategori: 'Info Vokasi',
      kategori: 'Info Lomba',
      kategori: 'Vokasi Juara',
      kategori: 'Tips & Trick'
    }])
  }
};
