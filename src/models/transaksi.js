const Connection = require('./../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Transaksi = dbConnection.define('transaksi', {
      id: {
          type: DataTypes.STRING,
          primaryKey: true
      },
      idMember: DataTypes.INTEGER,
      namaMember: DataTypes.STRING,
      idBatik: DataTypes.INTEGER,
      namaBatik: DataTypes.STRING,
      meter: DataTypes.INTEGER,
      hargaSatuan: DataTypes.INTEGER,
      hargaTotal: DataTypes.INTEGER,
      foto: DataTypes.STRING,
      status: DataTypes.ENUM(['Menunggu', 'Diproses', 'Pembayaran', 'Selesai', 'Dibatalkan'])
    },
    {
        freezeTableName: true
});

module.exports = Transaksi;
