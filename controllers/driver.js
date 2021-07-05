var connection = require('../service/db_connection');
module.exports.authenticate = function (req, res) {
    var driver_email = req.body.driver_email;
    var driver_password = req.body.driver_password;
    connection.query('SELECT * FROM driver WHERE driver_email = ?', [driver_email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (driver_password == results[0].driver_password) {
                    res.json({
                        status: true,
                        message: 'successfully authenticated'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email or password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "Email does not exits"
                });
            }
        }
    });
}
module.exports.register = function (req, res) {
    var today = new Date();
    var driver = {
        "driver_name": req.body.driver_name,
        "driver_email": req.body.driver_email,
        "driver_password": req.body.driver_password,
        "driver_phone": req.body.driver_phone,
        "vechile_id": req.body.vechile_id,
        "created_at": today,
        "updated_at": today
    }
    connection.query('INSERT INTO driver SET ?', driver, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'Driver registered sucessfully'
            })
        }
    });
}
module.exports.logout = function (req, res) {
    var driver_email = req.body.driver_email;
    var driver_password = req.body.driver_password;
    connection.query('SELECT * FROM driver WHERE driver_email = ?', [driver_email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (driver_password == results[0].driver_password) {
                    res.json({
                        status: true,
                        message: 'Driver successfully logout'
                    })
                } else {
                    res.json({
                        status: false,
                        message: "Email or password does not match"
                    });
                }

            }
            else {
                res.json({
                    status: false,
                    message: "Email does not exits"
                });
            }
        }
    });
}