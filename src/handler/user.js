'use strict';
const User = require('../models/user');
const { saveFiles } = require('./batik');

const getAllUserHandler = async (request, h) => {
  
  const getUser = await User.findAll();
  const userDataValues = getUser.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: userDataValues
    
  }).code(200);
};

const registerUserHandler = async (request, h) => {
  const { nama, email, password, telepon, foto} = request.payload;
  
  const check = await User.findOne({ where: { email: email } });
  
  if (check) {
    return h.response({
      status: 'email already registered'
    }).code(403)
  }
  const data = await User.create({nama, email, password, telepon, foto});
  return h.response({
    status: 'success',
    data: data.toJSON()
  })
};

const loginUserHandler = async (request, h) => {
  const { email, password} = request.payload;
  
  const data = await User.findOne({ where: { email: email, password: password } });
  if (data) { 
    return h.response({
      status: 'success',
      data: data.toJSON()
    })
  } else {
    return h.response({
      status: 'email atau password salah'
    }).code(404)
  }
};

const updateUserHandler = async (request, h) => {
  const { id, nama, email, password, telepon } = request.payload;
  
  const user = await User.findOne({ where: { id: id} });

  if (user) {
    try {
      await user.update({ nama, email, password, telepon });
      return h.response({
        status: 'success',
        data: user
      })
    } catch (error) {
      return h.response({
        status: 'Terjadi Kesalahan'
      })
    }
  } else {
    return h.response({
      status: 'data tidak ditemukan'
    }).code(404)
  }
};

const updatePhotoUser = async (request, h) => {
  const { id, fotoBaru } = request.payload;
  console.log(fotoBaru);
  
  const user = await User.findOne({ where: { id: id} });

  if (user) {
    var foto = user.dataValues.foto || "";
    var savedFotoName = await saveFiles(fotoBaru);
    foto = await savedFotoName.join(',');
    try {
      await user.update({ foto });
      console.log(user);
      return h.response({
        status: 'success',
        data: user
      })
    } catch (error) {
      return h.response({
        status: 'Terjadi kesalahan'
      })
    }
  } else {
    return h.response({
      status: 'data tidak ditemukan'
    }).code(404)
  }
};

module.exports = { 
  getAllUserHandler, 
  registerUserHandler,
  loginUserHandler,
  updateUserHandler,
  updatePhotoUser
};
