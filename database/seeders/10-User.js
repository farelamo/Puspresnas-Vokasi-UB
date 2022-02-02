'use strict';
var crypto = require('crypto');

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

    const user = [{
        nama: 'Farelamo',
        username: 'farlam',
        password: crypto.createHash('md5').update('12345').digest("hex"),
        level: 'Superadmin',
        foto: ''
      },
      {
        nama: 'Alvin DS',
        username: 'haya',
        password: crypto.createHash('md5').update('12345').digest("hex"),
        level: 'Superadmin',
        foto: ''
      },
      {
        nama: 'Naufalix',
        username: 'naufalix',
        password: crypto.createHash('md5').update('12345').digest("hex"),
        level: 'Superadmin',
        foto: ''
      },
      {
        nama: 'Fawwaz',
        username: 'fawwaz',
        password: crypto.createHash('md5').update('12345').digest("hex"),
        level: 'Admin',
        foto: ''
      },
      {
        nama: 'Umam',
        username: 'umam',
        password: crypto.createHash('md5').update('12345').digest("hex"),
        level: 'Admin',
        foto: ''
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