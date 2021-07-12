var mysql = require('mysql');


// require('dotenv').config();

//  const host = process.env.HOST || "localhost"
//  const user = process.env.USER || "root"
// const password = process.env.PASSWORD || "tiger"
// const database = process.env.DATABASE || "uber"

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:  "tiger",
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