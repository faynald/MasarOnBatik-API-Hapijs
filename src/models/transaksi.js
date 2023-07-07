const Connection = require('./../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Transaksi = dbConnection.define('transaksi', {
      id: {
          type: DataTypes.STRING,
          primaryKey: true
      },
      idUser: DataTypes.INTEGER,
      namaUser: DataTypes.STRING,
      idBatik: DataTypes.INTEGER,
      namaBatik: DataTypes.STRING,
      meter: DataTypes.INTEGER,
      hargaSatuan: DataTypes.INTEGER,
      hargaTotal: DataTypes.INTEGER,
      foto: DataTypes.STRING,
      status: DataTypes.ENUM(['Menunggu', 'Diproses', 'Selesai', 'Dibatalkan'])
    },
    {
        freezeTableName: true
});
dbConnection.sync();

module.exports = Transaksi;
