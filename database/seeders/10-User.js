'use strict';
let bcrypt = require('bcrypt')

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

    let user = [{
        nama: 'Farelamo',
        username: 'farlam',
        password: await bcrypt.hash('12345', 8),
        level: 'Superadmin',
        foto: '',
        is_active: 1
      },
      {
        nama: 'Alvin DS',
        username: 'haya',
        password: await bcrypt.hash('12345', 8),
        level: 'Superadmin',
        foto: '',
        is_active: 1
      },
      {
        nama: 'Naufalix',
        username: 'naufalix',
        password: await bcrypt.hash('12345', 8),
        level: 'Superadmin',
        foto: '',
        is_active: 1
      },
      {
        nama: 'Fawwaz',
        username: 'fawwaz',
        password: await bcrypt.hash('12345', 8),
        level: 'Admin',
        foto: '',
        is_active: 1
      },
      {
        nama: 'Umam',
        username: 'umam',
        password: await bcrypt.hash('12345', 8),
        level: 'Admin',
        foto: '',
        is_active: 1
      }
    ]

    return queryInterface.bulkInsert('user', user, {});
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