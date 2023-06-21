'use strict';
const Batik = require('../models/batik');

const getAllBatikHandler = async (request, h) => {
  
  var batik = await Batik.findAll();
  batik = batik.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: batik
  });
};

const inputBatikHandler = async (request, h) => {
  const { nama, harga, asal, deskripsi, foto } = request.payload;

  const data = await Batik.create({ nama, harga, asal, deskripsi, foto });
  return h.response({
    status: 'success',
    data: data.toJSON()
  })
};

const updateBatikHandler = async (request, h) => {
  const { id, nama, harga, asal, deskripsi, foto } = request.payload;

  const batik = await Batik.findOne({ where: { id: id} });
  if (batik) {
    await batik.update({ 
      // Update nilai-nilai kolom yang ingin diubah
      nama: nama,
      harga: harga,
      asal: asal,
      deskripsi: deskripsi,
      foto: foto
    });
    return h.response({
      status: 'success',
      data: batik // TODO : TEST this
    })
  } else {
    return h.response({
      status: 'Data batik tidak ditemukan'
    }).code(404)
  }
};

module.exports = {
  getAllBatikHandler,
  inputBatikHandler,
  updateBatikHandler
}
