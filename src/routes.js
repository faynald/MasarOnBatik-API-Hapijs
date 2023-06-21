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
  }
];

module.exports = routes;
