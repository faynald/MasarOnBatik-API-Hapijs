'use strict';
const Admin = require('../models/admin');
const { saveFiles } = require('./batik');

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

const updatePhotoAdmin = async (request, h) => {
  const { id, fotoBaru } = request.payload;
  
  const admin = await Admin.findOne({ where: { id: id} });

  if (admin) {
    var foto = admin.dataValues.foto || "";
    var savedFotoName = await saveFiles(fotoBaru);
    foto = await savedFotoName.join(',');
    try {
      await admin.update({ foto });
      return h.response({
        status: 'success',
        data: admin
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
  getAllAdminHandler, 
  registerAdminHandler,
  loginAdminHandler,
  getAdminProfile,
  updatePhotoAdmin
};
