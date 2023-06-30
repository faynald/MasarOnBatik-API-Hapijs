'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('transaksi', [
      {
        id: '1',
        idMember: 1,
        namaMember: 'John Doe',
        idBatik: 1,
        namaBatik: 'Batik ABC',
        meter: 2,
        hargaSatuan: 50000,
        hargaTotal: 100000,
        status: 'Menunggu',
      },
      {
        id: '2',
        idMember: 2,
        namaMember: 'Jane Smith',
        idBatik: 2,
        namaBatik: 'Batik XYZ',
        meter: 3,
        hargaSatuan: 60000,
        hargaTotal: 180000,
        status: 'Diproses',
      },
      // Tambahkan data transaksi lainnya sesuai kebutuhan
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transaksi', null, {});
  }
};
