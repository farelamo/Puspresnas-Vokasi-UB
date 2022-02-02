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

    await queryInterface.bulkInsert('bidang_lomba',
    [
      {
        nama_bidang: 'Keamanan Cyber',
        desk: 'Kompetisi kategori ini bertujuan untuk menguji kemampuan peserta dalam menghadapi kasus keamanan sistem komputer dan jaringan yang telah disiapkan',
        biaya: 'free',
        hadiah: 'Rp. 5.000.000.-',
        link: 'https://chat.whatsapp.com/JduVLI7m0iS6MGAiyKKgMC',
        file: '',
        jenis_lomba_id: '1',
        gambar: ''
      },
      {
        nama_bidang: 'Game Development',
        desk: 'Kompetisi pembuatan game guna mendukung sarana dan prasana pendidikan',
        biaya: 'free',
        hadiah: 'Rp. 5.000.000.-',
        link: 'https://chat.whatsapp.com/JduVLI7m0iS6MGAiyKKgMC',
        file: '',
        jenis_lomba_id: '1',
        gambar: ''
      },
      {
        nama_bidang: 'Pemrograman',
        desk: 'Kompetisi konsep Algoritma dalam pemecahan suatu masalah menggunakan struktur coding yang lebih efisiensi',
        biaya: 'free',
        hadiah: 'Rp. 5.000.000.-',
        link: 'https://chat.whatsapp.com/JduVLI7m0iS6MGAiyKKgMC',
        file: '',
        jenis_lomba_id: '1',
        gambar: ''
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
