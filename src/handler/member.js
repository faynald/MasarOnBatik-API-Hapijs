'use strict';
const Members = require('../models/member');

const getAllMemberHandler = async (request, h) => {
  
  const getMember = await Members.findAll();
  const membersDataValues = getMember.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: membersDataValues
    
  }).code(200);
};

const registerMemberHandler = async (request, h) => {
  const { nama, email, password, telepon, foto} = request.payload;
  
  const check = await Members.findOne({ where: { email: email } });
  
  if (check) {
    return h.response({
      status: 'email already registered'
    }).code(403)
  }
  const data = await Members.create({nama, email, password, telepon, foto});
  return h.response({
    status: 'success',
    data: data.toJSON()
  })
};

const loginMemberHandler = async (request, h) => {
  const { email, password} = request.payload;
  
  const data = await Members.findOne({ where: { email: email, password: password } });
  if (data) { 
    return h.response({
      status: 'success',
      data: data.toJSON()
    })
  } else {
    return h.response({
      status: 'email atau password salah'
    }).code(404)
  }
};

module.exports = { 
  getAllMemberHandler, 
  registerMemberHandler,
  loginMemberHandler
};
