module.exports = app => {

    const customer = require('../modules/controllers/customer');

    app.post('/customer_register', customer.register);
    app.post('/customer_login', customer.login);
    app.post('/customer_logout', customer.logout);

}
