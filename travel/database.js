const mysql = require('mysql2');
module.exports = mysql.createConnection({
    host:"localhost",
    user: "temp_user",
    password: "password",
    database: "travel",
});
