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

    await queryInterface.bulkInsert('mahasiswa',
    [
      {
        nama: 'Mochammad fawwaz Islami',
        nim: '203140914111041',
        jurusan: 'Teknologi Informatika',
        bidang_minat: 'Teknologi Informatika',
        jenis_lomba_id: '1',
        peringkat: 'Juara 1 Nasional',
        beritum_id: '3'
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

    await queryInterface.bulkDelete('mahasiswa',
    {
      nama: 'Mochammad Fawwaz Islami'
    }
    )
  }
};
