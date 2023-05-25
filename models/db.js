//docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=123123 -e MYSQL_DATABASE=ngas -d --platform linux/amd64 mysql:5.7
//docker exec -it nodejs-mysql bash
//mysql -u root -p

const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();


// if development mode, host is 127.0.0.1
// if production mode, host is mysql



const pool = mysql.createPool({
    // host: process.env.DB_HOST,
    host: 'mysql',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    port: 3306,
    multipleStatements: true
});

module.exports = pool.promise();