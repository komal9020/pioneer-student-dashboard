const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234", // your MySQL password
    database: "class_management"
});

db.connect((err) => {
    if(err) throw err;
    console.log("MySQL Connected");
});

module.exports = db;
