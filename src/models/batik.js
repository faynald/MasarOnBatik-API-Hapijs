const Connection = require('./../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Batik = dbConnection.define('batik', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      nama: {
          type: DataTypes.STRING
      },
      harga: {
          type: DataTypes.INTEGER
      },
      asal: {
          type: DataTypes.STRING
      },
      deskripsi: {
          type: DataTypes.STRING(1024)
      },
      foto: {
          type: DataTypes.STRING
      }
    },
    {
        freezeTableName: true
});

module.exports = Batik;
