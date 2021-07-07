module.exports = app => {
    const driver = require('../modules/controllers/driver');

    app.post('/driver_register', driver.register);
    app.post('/driver_login', driver.login);
    app.post('/driver_logout', driver.logout);

}