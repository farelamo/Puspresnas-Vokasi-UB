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

     return queryInterface.bulkInsert('berita',
     [
       {
         judul: 'Pekan Ilmiah Mahasiswa Nasional 2020, Universitas Brawijaya Jadi Juara Kedua',
         deskripsi: 'Tahun lalu, Mahasiswa vokasi UB meraih juara 2 di lomba Pekan Ilmiah',
         isi: 'Lorem Ipsum Dolor sit Amet',
         tanggal: '27-04-2021',
         foto: '',
         kategori_konten_id: '1'
       },
       {
         judul: 'Lorem Ipsum Dolor',
         deskripsi: 'Sit Amet',
         isi: 'Lorem Ipsum Dolor sit Amet',
         tanggal: '27-04-2021',
         foto: '',
         kategori_konten_id: '1'
       },
       {
        judul: '5 Mahasiswa UB Ciptakan Kateter Urin Otomatis',
        deskripsi: 'kateter evaluasi urin otomatis terintegrasi berbasis IoT untuk pasien ICU di Rumah Sakit',
        isi: 'Lorem Ipsum Dolor sit Amet',
        tanggal: '27-04-2021',
        foto: '',
        kategori_konten_id: '4'
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
  }
};
