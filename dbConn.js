const mysql = require('mysql');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();
//              TANPA SEQUELIZE
// const connection = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

//              DENGAN SEQUELIZE
const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    });

module.exports = connection;