const Connection = require('./../dbconfig');
const { DataTypes } = require('sequelize');

const dbConnection = Connection.connect;

const Members = dbConnection.define('member', {
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
      }
    },
    {
        freezeTableName: true
});

module.exports = Members;

module.exports.createUser = async function (nama, email, password, telepon, foto) {
    try {
      const data = await Members.create({nama, email, password, telepon, foto});
      return data.toJSON();
    } catch (error) {
      console.error(error);
    }
};

module.exports.getMember = async function () {
  try {
    const getMember = await Members.findAll();
    const membersDataValues = getMember.map(data => data.dataValues);
    return membersDataValues;
  } catch (error) {
    console.error(error);
  }
};

module.exports.isEmailValid = async function (email) {
  try {
    const check = await Members.findOne({ where: { email: email } });
    if (check) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};