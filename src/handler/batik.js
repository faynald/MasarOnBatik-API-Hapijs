'use strict';
const Batik = require('../models/batik');
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

const getTimeInJakartaWithoutSymbols = () => {
  const jakartaTime = moment().tz('Asia/Jakarta');
  const formattedTime = jakartaTime.format('YYYY-MM-DD_HH:mm:ss_SSSS');
  return formattedTime.replace(/[-:]/g, '');
};

const saveFiles = async (files) => {
  const fileNameArray = [];

  if(Array.isArray(files) && files.length > 1) { // jika upload lebih dari 1
    for (const file of files) {
      const time = `${getTimeInJakartaWithoutSymbols()}${path.extname(file.hapi.filename)}`;
      const fileStream = fs.createWriteStream(`./uploads/${time}`);
      fileNameArray.push(time);

      // Simpan file ke direktori yang diinginkan
      await new Promise((resolve, reject) => {
        file.pipe(fileStream);
        file.on('end', resolve);
        file.on('error', reject);
      });
    }
  } else if (!Array.isArray(files) && files.hapi.filename != "") { // jika file hanya 1
    const time = `${getTimeInJakartaWithoutSymbols()}${path.extname(files.hapi.filename)}`;
    const fileStream = fs.createWriteStream(`./uploads/${time}`);
    fileNameArray.push(time);

    // Simpan file ke direktori yang diinginkan
    await new Promise((resolve, reject) => {
      files.pipe(fileStream);
      files.on('end', resolve);
      files.on('error', reject);
    });
  } else if(files.hapi.filename === "") { // file tidak diisi
    console.log("foto kosong");
  }
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
