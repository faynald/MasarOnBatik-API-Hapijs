const { getAllBatikHandler, inputBatikHandler, updateBatikHandler, getBatikByIdHandler, deleteBatikHandler } = require("./handler/batik");
const { getAllUserHandler, registerUserHandler, loginUserHandler } = require("./handler/user");
const { getAllTransaksiHandler, getTransaksiByUserHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler, getTransaksiByUserAndStatusHandler, getTransaksiDetailHandler } = require("./handler/transaksi");
const { loginAdminHandler, registerAdminHandler, getAllAdminHandler } = require("./handler/admin");

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      return h.response({
        status: 'Hello World'
      }).code(200);
    }
  },
  {
    method: 'GET',
    path: '/user',
    handler: getAllUserHandler,
  },
  {
    method: 'POST',
    path: '/user',
    handler: registerUserHandler
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
    method: 'POST',
    path: '/admin/login',
    handler: loginAdminHandler
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
    method: 'POST',
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
];

module.exports = routes;
