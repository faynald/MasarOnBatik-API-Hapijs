const { getAllBatikHandler, inputBatikHandler, updateBatikHandler, getBatikByIdHandler, deleteBatikHandler } = require("./handler/batik");
const { getAllUserHandler, registerUserHandler, loginUserHandler, updateUserHandler, updatePhotoUser } = require("./handler/user");
const { getAllTransaksiHandler, getTransaksiByUserHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler, getTransaksiByUserAndStatusHandler, getTransaksiDetailHandler, updateStatusTransaksiHandler, getTransactionReportByTime, getTransactionReportByQuantityAndTime, getTransactionReportByDate, getTransactionReportByDay, getTransactionReportByMonth, getTransactionReportByYear, getYearData } = require("./handler/transaksi");
const { loginAdminHandler, registerAdminHandler, getAllAdminHandler, getAdminProfile } = require("./handler/admin");

const routes = [
  {
    method: 'GET',
    path: '/api/v1',
    handler: async ((req, res)=>{
        return res.response({
            status: 200, 
            message: 'Use {/api/v1} for main routes'
        }).code(200)
    })
  },
  {
    method: 'GET',
    handler: getAllUserHandler,
    path: '/api/v1/user',
  },
  {
    method: 'POST',
    path: '/api/v1/user',
    handler: registerUserHandler
  },
  {
    method: 'PUT',
    path: '/api/v1/user',
    handler: updateUserHandler
  },
  {
    method: 'PUT',
    path: '/api/v1/user-photo',
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
    path: '/api/v1/login',
    handler: loginUserHandler
  },
  {
    method: 'GET',
    path: '/api/v1/admin',
    handler: getAllAdminHandler,
  },
  {
    method: 'POST',
    path: '/api/v1/admin',
    handler: registerAdminHandler
  },
  {
    method: 'POST',
    path: '/api/v1/admin/login',
    handler: loginAdminHandler
  },
  {
    method: 'GET',
    path: '/api/v1/admin/{id}',
    handler: getAdminProfile
  },
  {
    method: 'GET',
    path: '/api/v1/batik',
    handler: getAllBatikHandler
  },
  {
    method: 'GET',
    path: '/api/v1/batik/{id}',
    handler: getBatikByIdHandler
  },
  {
    method: 'POST',
    path: '/api/v1/batik',
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
    path: '/api/v1/batik',
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
    path: '/api/v1/batik/{id}',
    handler: deleteBatikHandler
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi',
    handler: getAllTransaksiHandler
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi/{id}',
    handler: getTransaksiByUserHandler
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi-detail/{id}',
    handler: getTransaksiDetailHandler
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi-filter',
    handler: getTransaksiByStatusHandler
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi-user-filter',
    handler: getTransaksiByUserAndStatusHandler
  },
  {
    method: 'POST',
    path: '/api/v1/transaksi',
    handler: buatTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/api/v1/transaksi',
    handler: updateTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/api/v1/transaksi-status',
    handler: updateStatusTransaksiHandler
  },
  {
    method: 'GET',
    path: '/api/v1/laporan-day',
    handler: getTransactionReportByDay
  },
  {
    method: 'GET',
    path: '/api/v1/laporan-month',
    handler: getTransactionReportByMonth
  },
  {
    method: 'GET',
    path: '/api/v1/laporan-batik-terjual',
    handler: getTransactionReportByQuantityAndTime
  },
  {
    method: 'GET',
    path: '/api/v1/transaksi-year',
    handler: getYearData
  },
];

module.exports = routes;
