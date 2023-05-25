//initializing mysql
//docker run -p 3306:3306 --name nodejs-mysql -e MYSQL_ROOT_PASSWORD=123123 -e MYSQL_DATABASE=ngas -d --platform linux/amd64 mysql:5.7
//docker exec -it nodejs-mysql bash
//mysql -u root -p

//This file is used to initialize the database "Manually", only need to execute once.


const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
console.log(">>>",process.env.TOKEN_SECRET,process.env.DEV_DB_HOST);
const db = mysql.createConnection({
    host: process.env.DEV_DB_HOST,
    user: process.env.DEV_DB_USER,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
});
//clear the database
const FINAL_SOLUTION = "DROP TABLE IF EXISTS users;";

const GROUND_ZERO = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);";

//check mysql connection
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Mysql connected");
});


db.query(FINAL_SOLUTION, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Table dropped",result);
});

//break when finish
db.query(GROUND_ZERO, (err, result) => {
    if (err) {
        throw err;
    }
    console.log("Table created",result);
});

//insert test user
db.query("INSERT INTO users (email, password) VALUES    ('123', '123')", (err, result) => {
    if (err) {
        throw err;
    }
    console.log("User inserted",result);
});


db.end((err) => {
    console.log("MySQL connection closed");
  });