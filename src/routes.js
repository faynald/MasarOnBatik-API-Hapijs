const { getAllBatikHandler, inputBatikHandler, updateBatikHandler } = require("./handler/batik");
const { getAllMemberHandler, registerMemberHandler, loginMemberHandler } = require("./handler/member");
const { getAllTransaksiHandler, getTransaksiByMemberHandler, buatTransaksiHandler, getTransaksiByStatusHandler, updateTransaksiHandler } = require("./handler/transaksi");

const routes = [
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
    method: 'POST',
    path: '/batik',
    handler: inputBatikHandler
  },
  {
    method: 'PUT',
    path: '/batik',
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
