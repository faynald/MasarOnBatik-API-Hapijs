const { getAllBatikHandler, inputBatikHandler, updateBatikHandler } = require("./handler/batik");
const { getAllMemberHandler, registerMemberHandler, loginMemberHandler } = require("./handler/member");

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
    method: 'POST',
    path: '/batik/{id}',
    handler: updateBatikHandler
  },
];

module.exports = routes;
