'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('member', [
      {
        nama: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
        telepon: '123456789',
        foto: 'john.jpg',
      },
      {
        nama: 'Jane Smith',
        email: 'janesmith@example.com',
        password: 'password456',
        telepon: '987654321',
        foto: 'jane.jpg',
      },
      // Tambahkan data member lainnya sesuai kebutuhan
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('member', null, {});
  }
};
