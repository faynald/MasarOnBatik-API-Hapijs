'use strict';
const Transaksi = require('../models/transaksi');

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

const getTransaksiByMemberHandler = async (request, h) => {
  const { id } = request.params;

  var transaksi = await Transaksi.findAll({ where: { idMember: id }, order: [['createdAt', 'DESC']] });
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
  const { idMember, namaMember, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status } = request.payload;
  const id = "A12346"; // TODO : auto generate

  try {
    const data = await Transaksi.create({ id, idMember, namaMember, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status });
    return h.response({
      status: 'success',
      data: data.toJSON()
    })
  } catch (error) {
    console.log(error);
  }
};

const updateTransaksiHandler = async (request, h) => {
  const { id, idMember, namaMember, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status } = request.payload;
  
  const transaksi = await Transaksi.findOne({ where: { id: id} });

  if (transaksi) {
    try {
      await transaksi.update({ id, idMember, namaMember, idBatik, namaBatik, meter, hargaSatuan, hargaTotal, status });
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
  getTransaksiByMemberHandler,
  getTransaksiByStatusHandler,
  buatTransaksiHandler,
  updateTransaksiHandler
}
