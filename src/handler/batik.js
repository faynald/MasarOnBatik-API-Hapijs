'use strict';
const Batik = require('../models/batik');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const ftp = require("basic-ftp");

const getTimeInJakartaWithoutSymbols = () => {
  const jakartaTime = moment().tz('Asia/Jakarta');
  const formattedTime = jakartaTime.format('YYYY-MM-DD_HH:mm:ss_SSSS');
  return formattedTime.replace(/[-:]/g, '');
};

const saveFiles = async (files) => {
  const client = new ftp.Client()
  try {
    await client.access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USERNAME,
        password: process.env.FTP_PASSWORD,
        secure: true
    })
  }
  catch(err) {
    console.log(err)
  }
  const fileNameArray = [];

  if(files && Array.isArray(files) && files.length > 1) { // jika upload lebih dari 1
    for (const file of files) {
      const fileName = `${getTimeInJakartaWithoutSymbols()}${path.extname(file.hapi.filename)}`;
      fileNameArray.push(fileName);
      await client.uploadFrom(file, `public_html/${fileName}`)
    }
  } else if (files && !Array.isArray(files)) { // jika file hanya 1
    const fileName = `${getTimeInJakartaWithoutSymbols()}${path.extname(files.hapi.filename)}`;
    fileNameArray.push(fileName);
    await client.uploadFrom(files, `public_html/${fileName}`);
  } else if(!files) { // file tidak diisi
    console.log("foto kosong");
  }
  client.close()
  return fileNameArray;
}

const getAllBatikHandler = async (request, h) => {
  
  var batik = await Batik.findAll();
  batik = batik.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: batik
  });
};

const getBatikByIdHandler = async (request, h) => {
  const { id } = request.params;
  
  var batik = await Batik.findAll({ where: { id: id} });
  batik = batik.map(data => data.dataValues);
  return h.response({
    status: 'success',
    data: batik
  });
};

const inputBatikHandler = async (request, h) => {
  const { nama, harga, asal, deskripsi, files } = request.payload;
  var foto = null;

  var fileNameArray = await saveFiles(files);
  foto = await fileNameArray.join(',');
  
  const data = await Batik.create({ nama, harga, asal, deskripsi, foto });
  return h.response({
    status: 'success',
    data: data.toJSON()
  })
};

const updateBatikHandler = async (request, h) => {
  const { id, nama, harga, asal, deskripsi, tambahFoto, hapusFoto } = request.payload;

  const batik = await Batik.findOne({ where: { id: id} });
  if (batik) {
    console.log(`dataValues.foto: ${batik.dataValues.foto}`);
    var fotoArray = batik.dataValues.foto.split(",");
    // hapus foto
    fotoArray = fotoArray.filter(item => !hapusFoto.includes(item));
    // tambah foto
    var saveFilesNameArray = await saveFiles(tambahFoto);
    fotoArray.push(saveFilesNameArray);
    const foto = fotoArray.join(',');

    await batik.update({ 
      // Update nilai-nilai kolom yang ingin diubah
      nama: nama,
      harga: harga,
      asal: asal,
      deskripsi: deskripsi,
      foto: foto
    });
    return h.response({
      status: 'success',
      data: batik // TODO : TEST this
    })
  } else {
    return h.response({
      status: 'Data batik tidak ditemukan'
    }).code(404)
  }
};

module.exports = {
  getAllBatikHandler,
  getBatikByIdHandler,
  inputBatikHandler,
  updateBatikHandler
}
