var connection = require('../../database/db_connection');
const sendmail = require('../service/driver_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const bcryptjs = require('bcryptjs')
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'


module.exports.login = function (req, res) {
    var sql_query = 'SELECT * FROM driver WHERE driver_email = ?'
    var values = [req.body.driver_email, req.body.driver_password]
    var results = execute_query(sql_query, values)

    // var driver_email = req.body.driver_email;
    // var driver_password = req.body.driver_password;
    // connection.query('SELECT * FROM driver WHERE driver_email = ?', [driver_email], function (error, results, fields) {
        if (error) {
            return responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
        }
        else {
            if (results.length > 0) {
                if (driver_password == results[0].driver_password) {
                    return responce.sendResponse(res, 'successfully login', status_code.STATUS_CODES.SUCCESS)
                }
                else {
                    return responce.sendResponse(res, "Email or password does not match", status_code.STATUS_CODES.BAD_REQUEST)
                }
            }
            else {
                return responce.sendResponse(res, "Email does not exits", status_code.STATUS_CODES.NOT_FOUND)
            }
        }
    //});
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
            return responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.BAD_REQUEST)
        }
        else {
            console.log("Email send on your Mail :)")
            sendmail.ab()
            return responce.sendResponse(res, 'Driver registered sucessfully', status_code.STATUS_CODES.SUCCESS)
        }
    });
}
module.exports.logout = function (req, res) {
    return responce.sendResponse(res, 'Driver successfully logout', status_code.STATUS_CODES.SUCCESS)
}