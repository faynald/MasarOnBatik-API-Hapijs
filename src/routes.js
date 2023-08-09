const { getAllBatikHandler, inputBatikHandler, updateBatikHandler, getBatikByIdHandler, deleteBatikHandler } = require("./handler/batik");
const { getUserHandler, registerUserHandler, loginUserHandler, updateUserHandler, updatePhotoUser } = require("./handler/user");
const { getAllTransaksiHandler, getTransaksiByUserHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler, getTransaksiByUserAndStatusHandler, getTransaksiDetailHandler, updateStatusTransaksiHandler, getTransactionReportByTime, getTransactionReportByQuantityAndTime, getTransactionReportByDate, getTransactionReportByDay, getTransactionReportByMonth, getTransactionReportByYear, getYearData } = require("./handler/transaksi");
const { loginAdminHandler, registerAdminHandler, getAllAdminHandler, getAdminProfile, updatePhotoAdmin } = require("./handler/admin");

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: ((req, res)=>{
        return res.response({
            status: 200, 
            message: 'Welcome to MasarOnBatik API'
        }).code(200)
    })
  },
  {
    method: 'GET',
    path: '/user',
    handler: getUserHandler,
  },
  {
    method: 'POST',
    path: '/user',
    handler: registerUserHandler
  },
  {
    method: 'PUT',
    path: '/user',
    handler: updateUserHandler
  },
  {
    method: 'PUT',
    path: '/user-photo',
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
    path: '/login',
    handler: loginUserHandler
  },
  {
    method: 'GET',
    path: '/admin',
    handler: getAllAdminHandler,
  },
  {
    method: 'POST',
    path: '/admin',
    handler: registerAdminHandler
  },
  {
    method: 'PUT',
    path: '/admin-photo',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart : true,
        maxBytes: 30 * 1024 * 1024 // 30MB dalam byte
      }
    },
    handler: updatePhotoAdmin
  },
  {
    method: 'POST',
    path: '/admin/login',
    handler: loginAdminHandler
  },
  {
    method: 'GET',
    path: '/admin/{id}',
    handler: getAdminProfile
  },
  {
    method: 'GET',
    path: '/batik',
    handler: getAllBatikHandler
  },
  {
    method: 'GET',
    path: '/batik/{id}',
    handler: getBatikByIdHandler
  },
  {
    method: 'POST',
    path: '/batik',
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
    path: '/batik',
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
    path: '/batik/{id}',
    handler: deleteBatikHandler
  },
  {
    method: 'GET',
    path: '/transaksi',
    handler: getAllTransaksiHandler
  },
  {
    method: 'GET',
    path: '/transaksi/{id}',
    handler: getTransaksiByUserHandler
  },
  {
    method: 'GET',
    path: '/transaksi-detail/{id}',
    handler: getTransaksiDetailHandler
  },
  {
    method: 'GET',
    path: '/transaksi-filter',
    handler: getTransaksiByStatusHandler
  },
  {
    method: 'GET',
    path: '/transaksi-user-filter',
    handler: getTransaksiByUserAndStatusHandler
  },
  {
    method: 'POST',
    path: '/transaksi',
    handler: buatTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/transaksi',
    handler: updateTransaksiHandler
  },
  {
    method: 'PUT',
    path: '/transaksi-status',
    handler: updateStatusTransaksiHandler
  },
  {
    method: 'GET',
    path: '/laporan-day',
    handler: getTransactionReportByDay
  },
  {
    method: 'GET',
    path: '/laporan-month',
    handler: getTransactionReportByMonth
  },
  {
    method: 'GET',
    path: '/laporan-batik-terjual',
    handler: getTransactionReportByQuantityAndTime
  },
  {
    method: 'GET',
    path: '/transaksi-year',
    handler: getYearData
  },
];

module.exports = routes;
