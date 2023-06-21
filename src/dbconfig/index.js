const Sequelize = require('sequelize');

const sequelize = new Sequelize('masaronbatik', 'root', 'root', {
    host: 'localhost',
    port: 3300,
    dialect: 'mysql'
});

module.exports.connect = sequelize;

// async function testConnection() {

//     try {
//         await sequelize.authenticate();
//         console.log("Connected!");
//         const [results, metadata] = await sequelize.query('SELECT * FROM member');
//         console.log(results);
//         // const [results2, metadata2] = await sequelize.query('UPDATE member SET nama = "Farhan Reynaldi Valeri" WHERE id = 1');
//         // console.log(metadata2.affectedRows); // if success it will be 1, else 0
//     } catch(err) {
//         console.log("Can't connect to database!");
//     }

// }

// testConnection();