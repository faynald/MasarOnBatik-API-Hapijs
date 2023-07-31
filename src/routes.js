const { getAllBatikHandler, inputBatikHandler, updateBatikHandler, getBatikByIdHandler, deleteBatikHandler } = require("./handler/batik");
const { getAllUserHandler, registerUserHandler, loginUserHandler, updateUserHandler, updatePhotoUser } = require("./handler/user");
const { getAllTransaksiHandler, getTransaksiByUserHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler, getTransaksiByUserAndStatusHandler, getTransaksiDetailHandler, updateStatusTransaksiHandler, getTransactionReportByTime, getTransactionReportByQuantityAndTime, getTransactionReportByDate, getTransactionReportByDay, getTransactionReportByMonth, getTransactionReportByYear, getYearData } = require("./handler/transaksi");
const { loginAdminHandler, registerAdminHandler, getAllAdminHandler, getAdminProfile } = require("./handler/admin");

const routes = [
  {
    method: 'GET',
    path: '/api',
    handler: async (request, h) => {
      return h.response({
        status: 'Hello World'
      }).code(200);
    }
  },
  {
    method: 'GET',
    path: '/api/user',
    handler: getAllUserHandler,
  },
  {
    method: 'POST',
    path: '/api/user',
    handler: registerUserHandler
  },
  {
    method: 'PUT',
    path: '/api/user',
    handler: updateUserHandler
  },
  {
    method: 'PUT',
    path: '/api/user-photo',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart : true,
        maxBytes: 30 * 1024 * 1024 // 30MB dalam byte
      }
    },
    handler: updatePhotoUser
  },
  {
    method: 'POST',
    path: '/api/login',
    handler: loginUserHandler
  },
  {
    method: 'GET',
    path: '/api/admin',
    handler: getAllAdminHandler,
  },
  {
    method: 'POST',
    path: '/api/admin',
    handler: registerAdminHandler
  },
  {
    method: 'POST',
    path: '/api/admin/login',
    handler: loginAdminHandler
  },
  {
    method: 'GET',
    path: '/api/admin/{id}',
    handler: getAdminProfile
  },
  {
    method: 'GET',
    path: '/api/batik',
    handler: getAllBatikHandler
  },
  {
    method: 'GET',
    path: '/api/batik/{id}',
    handler: getBatikByIdHandler
  },
  {
    method: 'POST',
    path: '/api/batik',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart : true ,
        maxBytes: 30 * 1024 * 1024 // 30MB dalam byte
      }
    },
    handler: inputBatikHandler
  },
  {
    method: 'PUT',
    path: '/api/batik',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart : true ,
        maxBytes: 30 * 1024 * 1024 // 30MB dalam byte
      }
    },
    handler: updateBatikHandler
  },
  {
    method: 'DELETE',
    path: '/api/batik/{id}',
    handler: deleteBatikHandler
  },
  {
    method: 'GET',
    path: '/api/transaksi',
    handler: getAllTransaksiHandler
  },
  {
    method: 'GET',
    path: '/api/transaksi/{id}',
    handler: getTransaksiByUserHandler
  },
  {
    method: 'GET',
    path: '/api/transaksi-detail/{id}',
    handler: getTransaksiDetailHandler
  },
  {
    method: 'GET',
    path: '/api/transaksi-filter',
    handler: getTransaksiByStatusHandler
  },
  {
    method: 'GET',
    path: '/api/transaksi-user-filter',
    handler: getTransaksiByUserAndStatusHandler
  },
  {
    method: 'POST',
    path: '/api/transaksi',
    handler: buatTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/api/transaksi',
    handler: updateTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/api/transaksi-status',
    handler: updateStatusTransaksiHandler
  },
  {
    method: 'GET',
    path: '/api/laporan-day',
    handler: getTransactionReportByDay
  },
  {
    method: 'GET',
    path: '/api/laporan-month',
    handler: getTransactionReportByMonth
  },
  {
    method: 'GET',
    path: '/api/laporan-batik-terjual',
    handler: getTransactionReportByQuantityAndTime
  },
  {
    method: 'GET',
    path: '/api/transaksi-year',
    handler: getYearData
  },
];

module.exports = routes;
