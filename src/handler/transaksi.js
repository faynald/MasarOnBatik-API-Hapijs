'use strict';
const Transaksi = require('../models/transaksi');
const { v4: uuidv4 } = require('uuid');
const { Sequelize, Op } = require('sequelize');

const formatDate = (isStart, date) => {

  // Mengubah bagian jam menjadi "00:00:00"
  const modifiedTimePart = isStart ? "00:00:00" : "11:59:59";
  
  // Menggabungkan kembali bagian tanggal dan jam yang telah diubah
  const modifiedDateTime = `${date}T${modifiedTimePart}.000Z`;
  
  return new Date(modifiedDateTime);
};

const getAllTransaksiHandler = async (request, h) => {
  
  var transaksi = await Transaksi.findAll({ order: [['createdAt', 'DESC']] });
  transaksi = transaksi.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: transaksi
  });
};

const getTransaksiByStatusHandler = async (request, h) => {
  const { status } = request.query;
  
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

const updateStatusTransaksiHandler = async (request, h) => {
  const { id, status } = request.payload;
  
  const transaksi = await Transaksi.findOne({ where: { id: id} });

  if (transaksi) {
    try {
      await transaksi.update({ status });
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

// Function to get transaction report by quantity sold and transaction time
const getTransactionReportByQuantityAndTime = async (request, h) => {
  try {
    // Group by namaBatik and sum the meter and hargaTotal
    const report = await Transaksi.findAll({
      attributes: [
        'namaBatik',
        [Sequelize.fn('sum', Sequelize.col('meter')), 'totalTerjual'],
        [Sequelize.fn('sum', Sequelize.col('hargaTotal')), 'totalPemasukan'],
      ],
      group: ['namaBatik'],
      order: [[Sequelize.literal('totalTerjual'), 'DESC']],
    });

    return h.response({
      status: 'success',
      data: report
    })
  } catch (error) {
    return h.response({
      status: 'error',
      data: error.message
    })
  }
}

// Function to get transaction report by transaction date
const getTransactionReportByDay = async (request, h) => {
  try {
    const { startDate, endDate } = request.query;

    // Group by createdAt date and sum the meter and hargaTotal
    var report = await Transaksi.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-%d'), 'tanggalTransaksi'],
        [Sequelize.fn('sum', Sequelize.col('meter')), 'totalTerjual'],
        [Sequelize.fn('sum', Sequelize.col('hargaTotal')), 'totalPemasukan'],
      ],      
      where: {
        // Menggunakan operator '>=', artinya tanggalTransaksi harus lebih besar atau sama dengan start
        // Dan operator '<=', artinya tanggalTransaksi harus lebih kecil atau sama dengan end
        createdAt: { [Op.gte]: formatDate(true, startDate), [Op.lte]: formatDate(false, endDate) }
      },
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m-%d')],
      order: [[Sequelize.literal('tanggalTransaksi'), 'DESC']],
    });
    return h.response({
      status: 'success',
      data: report
    })
  } catch (error) {
    return h.response({
      status: 'error',
      data: error.message
    })
  }
}

// Function to get transaction report by transaction month
const getTransactionReportByMonth = async (request, h) => {
  try {
    const groupBy = '%Y-%m';
    // Group by createdAt date and sum the meter and hargaTotal
    var report = await Transaksi.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'tanggalTransaksi'],
        [Sequelize.fn('sum', Sequelize.col('meter')), 'totalTerjual'],
        [Sequelize.fn('sum', Sequelize.col('hargaTotal')), 'totalPemasukan'],
      ],
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m')],
      order: [[Sequelize.literal('tanggalTransaksi'), 'DESC']],
    });
    return h.response({
      status: 'success',
      data: report
    })
  } catch (error) {
    return h.response({
      status: 'error',
      data: error.message
    })
  }
}

// Function to get transaction report by transaction month
const getTransactionReportByYear = async (request, h) => {
  try {
    const groupBy = '%Y-%m';
    // Group by createdAt date and sum the meter and hargaTotal
    var report = await Transaksi.findAll({
      attributes: [
        [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y'), 'tanggalTransaksi'],
        [Sequelize.fn('sum', Sequelize.col('meter')), 'totalTerjual'],
        [Sequelize.fn('sum', Sequelize.col('hargaTotal')), 'totalPemasukan'],
      ],
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y')],
      order: [[Sequelize.literal('tanggalTransaksi'), 'DESC']],
    });
    return h.response({
      status: 'success',
      data: report
    })
  } catch (error) {
    return h.response({
      status: 'error',
      data: error.message
    })
  }
}

module.exports = {
  getAllTransaksiHandler,
  getTransaksiByUserHandler,
  getTransaksiDetailHandler,
  getTransaksiByStatusHandler,
  getTransaksiByUserAndStatusHandler,
  buatTransaksiHandler,
  updateTransaksiHandler,
  updateStatusTransaksiHandler,
  getTransactionReportByDay,
  getTransactionReportByMonth,
  getTransactionReportByYear,
  getTransactionReportByQuantityAndTime
}
