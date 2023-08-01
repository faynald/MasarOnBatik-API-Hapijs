'use strict';
const Admin = require('../models/admin');

const getAllAdminHandler = async (request, h) => {
  
  const getAdmin = await Admin.findAll();
  const adminDataValues = getAdmin.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: adminDataValues
    
  }).code(200);
};

const registerAdminHandler = async (request, h) => {
  const { nama, email, password, telepon, foto, umkm, alamatUmkm} = request.payload;
  
  const check = await Admin.findOne({ where: { email: email } });
  
  if (check) {
    return h.response({
      status: 'email already registered'
    }).code(403)
  }
  const data = await Admin.create({nama, email, password, telepon, foto, umkm, alamatUmkm});
  return h.response({
    status: 'success',
    data: data.toJSON()
  })
};

const loginAdminHandler = async (request, h) => {
  try{
    const { email, password} = request.payload;
  
    const data = await Admin.findOne({ where: { email: email, password: password } });
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
  } catch (e) {
    return h.response({
      status: 'gagal',
      message: e.message
    })
  }
};

const getAdminProfile = async (request, h) => {
  const { id } = request.params;
  
  const data = await Admin.findOne({ where: { id: id } });
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
  getAllAdminHandler, 
  registerAdminHandler,
  loginAdminHandler,
  getAdminProfile
};
