'use strict';
const User = require('../models/user');

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

module.exports = { 
  getAllUserHandler, 
  registerUserHandler,
  loginUserHandler,
};
