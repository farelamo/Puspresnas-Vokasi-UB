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

    return queryInterface.bulkInsert('tag_lomba',
      [{
          tag: 'Cyber Security',
          kategori_lomba_id: '1'
        },
        {
          tag: 'Pemrograman',
          kategori_lomba_id: '1'
        },
        {
          tag: 'Game Development',
          kategori_lomba_id: '1'
        },
        {
          tag: 'IoT',
          kategori_lomba_id: '1'
        },
        {
          tag: 'Data Mining',
          kategori_lomba_id: '1'
        },
        {
          tag: 'UI/UX Design',
          kategori_lomba_id: '1'
        },
        {
          tag: 'Design 3D',
          kategori_lomba_id: '2'
        },
        {
          tag: 'Design 2D',
          kategori_lomba_id: '2'
        },
        {
          tag: 'Bisnis Plan',
          kategori_lomba_id: '3'
        },
        {
          tag: 'English Conversation',
          kategori_lomba_id: '4'
        }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('tag_lomba',
      [{
        tag: 'Cyber Security',
        tag: 'Pemrograman',
        tag: 'Game Development',
        tag: 'IoT',
        tag: 'Data Mining',
        tag: 'UI/UX Design',
        tag: 'Design 2D',
        tag: 'Design 3D',
        tag: 'Bisnis Plan',
        tag: 'English Conversation',
      }]
    );
  }
};