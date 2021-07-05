var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var customer = require('./controllers/customer');
var driver = require('./controllers/driver');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* route to handle login , logout and registration */

app.post('/customer_register', customer.register);
app.post('/customer_login', customer.authenticate);
app.post('/customer_logout', customer.logout);

app.post('/driver_register', driver.register);
app.post('/driver_login', driver.authenticate);
app.post('/driver_logout', driver.logout);


app.listen(8000, () => {
    console.log("server running on port: 8000")
});