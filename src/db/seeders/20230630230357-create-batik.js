'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('batik', [
      {
        nama: 'Batik 1',
        harga: 100000,
        asal: 'Asal 1',
        deskripsi: 'Deskripsi Batik 1',
        foto: 'foto1.jpg',
      },
      {
        nama: 'Batik 2',
        harga: 150000,
        asal: 'Asal 2',
        deskripsi: 'Deskripsi Batik 2',
        foto: 'foto2.jpg',
      },
      {
        nama: 'Batik 3',
        harga: 200000,
        asal: 'Asal 3',
        deskripsi: 'Deskripsi Batik 3',
        foto: 'foto3.jpg',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('batik', null, {});
  },
};
