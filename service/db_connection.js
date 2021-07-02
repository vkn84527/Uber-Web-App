var mysql = require ('mysql');

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password :"tiger",
    database : "uber",
    multipleStatements: true //when multiple queries are executed at the same time
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Your DataBase is Connected!....");
});

module.exports = conn