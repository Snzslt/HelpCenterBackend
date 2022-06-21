const myscql = require('mysql2/promise');
require('dotenv').config();

// production conction 

// const connection = async () => {
//     const db = await myscql.createConnection({
//         host: "linda.iran.liara.ir",
//         port:"33739",
//         user: "root",
//         password: "me5gmLq6vhIQT3D56IjUmBho",
//         database:"pensive_edison",
//         connectionLimit:1000,
//     });
//     return db; 
// }

// local conctions 

const connection = async() => {
    const db = await myscql.createConnection({
        host: process.env.DB_HOSTNAME,
        // port:"",
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    return db;

}


module.exports = connection;