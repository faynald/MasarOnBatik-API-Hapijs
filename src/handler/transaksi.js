'use strict';
const Transaksi = require('../models/transaksi');
const { v4: uuidv4 } = require('uuid');

const getAllTransaksiHandler = async (request, h) => {
  
  var transaksi = await Transaksi.findAll({ order: [['createdAt', 'DESC']] });
  transaksi = transaksi.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: transaksi
  });
};

const getTransaksiByStatusHandler = async (request, h) => {
  const { status } = request.payload;
  
  var transaksi = await Transaksi.findAll({ where: { status: status }, order: [['createdAt', 'DESC']] });
  transaksi = transaksi.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: transaksi
  });
};

const getTransaksiByUserHandler = async (request, h) => {
  const { id } = request.params;

  var transaksi = await Transaksi.findAll({ where: { idUser: id }, order: [['createdAt', 'DESC']] });
  if (transaksi) {
    transaksi = transaksi.map(data => data.dataValues);
      return h.response({
        status: 'success',
        data: transaksi
      });
  } else {
    return h.response({
      status: 'Data transaksi tidak ditemukan'
    }).code(404)
  }
};

const getTransaksiDetailHandler = async (request, h) => {
  const { id } = request.params;

  var transaksi = await Transaksi.findOne({ where: { id: id } });
  if (transaksi) {
      return h.response({
        status: 'success',
        data: transaksi.toJSON()
      });
  } else {
    return h.response({
      status: 'Data transaksi tidak ditemukan'
    }).code(404)
  }
};

const getTransaksiByUserAndStatusHandler = async (request, h) => {
  const { id, status } = request.query;
  console.log(id, status);

  var transaksi = await Transaksi.findAll({ 
    where: { 
      idUser: id,
      status: status
    }, 
    order: [['createdAt', 'DESC']] 
  });
  if (transaksi) {
    transaksi = transaksi.map(data => data.dataValues);
      return h.response({
        status: 'success',
        data: transaksi
      });
  } else {
    return h.response({
      status: 'Data transaksi tidak ditemukan'
    }).code(404)
  }
};

const buatTransaksiHandler = async (request, h) => {
  const { idUser, namaUser, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, foto, status } = request.payload;
  const id = "ID" + uuidv4().slice(0, 6).toUpperCase();

  try {
    const data = await Transaksi.create({ id, idUser, namaUser, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, foto, status });
    return h.response({
      status: 'success',
      data: data.toJSON()
    })
  } catch (error) {
    console.log(error);
  }
};

const updateTransaksiHandler = async (request, h) => {
  const { id, idUser, namaUser, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status } = request.payload;
  
  const transaksi = await Transaksi.findOne({ where: { id: id} });

  if (transaksi) {
    try {
      await transaksi.update({ id, idUser, namaUser, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status });
      return h.response({
        status: 'success',
        data: transaksi
      })
    } catch (error) {
      console.log(error);
    }
  } else {
    return h.response({
      status: 'data tidak ditemukan'
    })
  }
  
};

module.exports = {
  getAllTransaksiHandler,
  getTransaksiByUserHandler,
  getTransaksiDetailHandler,
  getTransaksiByStatusHandler,
  getTransaksiByUserAndStatusHandler,
  buatTransaksiHandler,
  updateTransaksiHandler
}
