var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "uber",
    multipleStatements: true //when multiple queries are executed at the same time
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    }
    else {
        console.log("Error while connecting with database");
    }
});

module.exports = connection;