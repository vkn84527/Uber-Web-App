var express = require("express");
var app = express();

var mydb_conn = require('./service/db_connection')

app.listen(port, () => {
    console.log("Server is Running on port 3000")
})
