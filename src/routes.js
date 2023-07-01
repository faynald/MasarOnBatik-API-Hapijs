const { getAllBatikHandler, inputBatikHandler, updateBatikHandler, getBatikByIdHandler } = require("./handler/batik");
const { getAllMemberHandler, registerMemberHandler, loginMemberHandler } = require("./handler/member");
const { getAllTransaksiHandler, getTransaksiByMemberHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler } = require("./handler/transaksi");

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
    path: '/member',
    handler: getAllMemberHandler,
  },
  {
    method: 'POST',
    path: '/member',
    handler: registerMemberHandler
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginMemberHandler
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
    method: 'GET',
    path: '/transaksi',
    handler: getAllTransaksiHandler
  },
  {
    method: 'GET',
    path: '/transaksi/{id}',
    handler: getTransaksiByMemberHandler
  },
  {
    method: 'POST',
    path: '/transaksi-filter',
    handler: getTransaksiByStatusHandler
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
