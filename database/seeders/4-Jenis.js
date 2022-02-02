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
   await queryInterface.bulkInsert('jenis_lomba',
   [
     {
      nama_lomba: 'GEMASTIK XII 2021',      
      sumber: 'Gemastik Telkom University',      
      desk: 'Program ini ditujukan untuk meningkatkan kompetensi mahasiswa Indonesia, sehingga mampu mengambil peran sebagai agen perubahan dalam memajukan TIK dan pemanfaatannya, baik ketika masih dalam masa studi maupun kelak sesudah lulus studi.',      
      tipe: 'Team',      
      kategori_lomba_id: '1',      
      tanggal: '',      
      gambar: '',      
     },
     {
      nama_lomba: 'Olivia 2021',      
      sumber: 'Institut Teknologi Sepuluh November',      
      desk: 'merupakan kompetisi Nasional yang dapat digunakan sebagai media mengembangkan keilmuan terkini di bidang Science dan Technology dengan berbagai topik terkait.',      
      tipe: 'Team',      
      kategori_lomba_id: '1',      
      tanggal: '',      
      gambar: '',      
     },
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
    await queryInterface.bulkDelete('jenis_lomba',
     {
      nama_lomba: 'GEMASTIK XII 2021',
      nama_lomba: 'Olivia 2021',
     }
     );
  }
};
