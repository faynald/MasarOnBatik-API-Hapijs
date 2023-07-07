const Connection = require('../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Admin = dbConnection.define('admin', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      nama: {
          type: DataTypes.STRING
      },
      email: {
          type: DataTypes.STRING
      },
      password: {
          type: DataTypes.STRING
      },
      telepon: {
          type: DataTypes.STRING
      },
      foto: {
          type: DataTypes.STRING
      },
      umkm: {
          type: DataTypes.STRING
      },
      alamatUmkm: {
          type: DataTypes.STRING
      }
    },
    {
        freezeTableName: true
});

module.exports = Admin;
