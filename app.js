var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var customer = require('./controllers/customer');
//var registerController = require('./controllers/register-controller');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* route to handle login and registration */

app.post('/customer_register',customer.register);
app.post('/customer_signin', customer.authenticate);
app.post('/customer_logout', customer.logout);

app.listen(8000, () => { console.log("server running on port: 8000") });