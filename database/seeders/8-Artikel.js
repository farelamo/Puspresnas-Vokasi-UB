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

    return queryInterface.bulkInsert('artikel',
      [
        {
          judul: 'Pekan Ilmiah Mahasiswa Nasional 2020, Universitas Brawijaya Jadi Juara Kedua',
          deskripsi: 'Tahun lalu, Mahasiswa vokasi UB meraih juara 2 di lomba Pekan Ilmiah',
          isi: 'Lorem Ipsum Dolor sit Amet',
          tanggal: '2021-03-01',
          foto: '',
          kategori_konten_id: 1
        },
        {
          judul: 'Jelang Lomba Gemastik 2021, Vokasi UB mengadakan bimbingan lomba rutin',
          deskripsi: 'Sit Amet',
          isi: 'Lorem Ipsum Dolor sit Amet',
          tanggal: '2021-03-02',
          foto: '',
          kategori_konten_id: 1
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

    return queryInterface.bulkDelete('Users', [{
      judul: 'Pekan Ilmiah Mahasiswa Nasional 2020, Universitas Brawijaya Jadi Juara Kedua',
      judul: 'Jelang Lomba Gemastik 2021, Vokasi UB mengadakan bimbingan lomba rutin'
    }])
  }
};