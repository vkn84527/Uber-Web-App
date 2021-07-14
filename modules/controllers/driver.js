const sendmail = require('../service/driver_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const hash_service = require('../common_functions/hashing');
const jwt = require('jsonwebtoken')
var secret_key1 = process.env.secret_key1

module.exports.login = function (req, res) {
    var sql_query = 'SELECT * FROM driver WHERE driver_email = ?';
    var values = [req.body.driver_email]
    var results = execute_query(sql_query, values)
    results.then((message) => {
        if (message.length === 0) {
            return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.UNAUTHORIZED);
        }
        else {
            const user = { driver_email: req.body.driver_email, driver_id: message.insertId }
            var check_pass = hash_service.compare_password(req.body.driver_password, message[0].driver_password)
            check_pass.then((mess) => {
                token = jwt.sign(user, secret_key1)
                responce.sendtokendriverResponse(res, 'Auth Successful', token, req.body.driver_email, message[0].driver_id, status_code.STATUS_CODES.SUCCESS)

            }).catch((mess) => {
                return responce.sendResponse(res, "Wrong Password", status_code.STATUS_CODES.BAD_REQUEST);
            })
        }
    }).catch((message) => {
        responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
    })
}

module.exports.register = function (req, res) {
    var today = new Date();
    var sql_query = 'SELECT * FROM driver WHERE driver_email = ?';
    var values = [req.body.driver_email]
    var results = execute_query(sql_query, values)
    results.then((message) => {
        if (message.length !== 0) {
            return responce.sendResponse(res, "Email already Registered", status_code.STATUS_CODES.UNAUTHORIZED);
        } else {
            var hash = hash_service.hash_password(req.body.driver_password)
            hash.then((hash) => {

                var sql_query = 'INSERT INTO driver (vechile_id,driver_name,driver_phone,driver_email,created_at,updated_at,driver_password)values(?,?,?,?,?,?,?)'
                var values = [req.body.vechile_id, req.body.driver_name, req.body.driver_phone, req.body.driver_email, today, today, hash]
                var results = execute_query(sql_query, values)

                results.then((message) => {
                    console.log("Driver registered sucessfully.........")
                    console.log("Email send on your Mail :)")
                    //sendmail.ab()
                    const user = { driver_email: req.body.driver_email, driver_id: message.insertId }
                    token = jwt.sign(user, secret_key1)
                    //console.log(token)
                    responce.sendtokendriverResponse(res, 'Driver registered sucessfully', token, req.body.driver_email, message.insertId, status_code.STATUS_CODES.SUCCESS)

                }).catch((message) => {
                    console.log(message)
                    responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.BAD_REQUEST)
                })
            }).catch((message) => {
                responce.sendResponse(res, 'Password hasing Error', status_code.STATUS_CODES.UNAUTHORIZED)
            })
        }
    }).catch((message) => {
        //console.log(message)
        responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.BAD_REQUEST)
    })
}


module.exports.logout = function (req, res) {
    return responce.sendResponse(res, 'Driver successfully logout', status_code.STATUS_CODES.SUCCESS)
}






































// module.exports.login = function (req, res) {
//     var sql_query = 'SELECT * FROM driver WHERE driver_email = ?';
//     var values = [req.body.driver_email]
//     var results = execute_query(sql_query, values)

//     // var driver_email = req.body.driver_email;
//     // var driver_password = req.body.driver_password;
//     // connection.query('SELECT * FROM driver WHERE driver_email = ?', [driver_email], function (error, results, fields) {
//         if (results.error) {
//         return responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
//     }
//     else {
//         if (results.length > 0) {
//             if (driver_password == results[0].driver_password) {
//                 return responce.sendResponse(res, 'successfully login', status_code.STATUS_CODES.SUCCESS)
//             }
//             else {
//                 return responce.sendResponse(res, "Email or password does not match", status_code.STATUS_CODES.BAD_REQUEST)
//             }
//         }
//         else {
//             return responce.sendResponse(res, "Email does not exits", status_code.STATUS_CODES.NOT_FOUND)
//         }
//     }
//     //});
// }
// module.exports.register = function (req, res) {
//     var today = new Date();
//     var sql_query = 'INSERT INTO driver (vechile_id,driver_name,driver_phone,driver_email,created_at,updated_at,driver_password)values(?,?,?,?,?,?,?)'
//     var values = [req.body.vechile_id, req.body.driver_name, req.body.driver_phone, req.body.driver_email,today,today,req.body.driver_password]
//     var results = execute_query(sql_query, values)
//     console.log(results)
//     // var driver = {
//     //     "driver_name": req.body.driver_name,
//     //     "driver_email": req.body.driver_email,
//     //     "driver_password": req.body.driver_password,
//     //     "driver_phone": req.body.driver_phone,
//     //     "vechile_id": req.body.vechile_id,
//     //     "created_at": today,
//     //     "updated_at": today
//     // }
//     // connection.query('INSERT INTO driver SET ?', driver, function (error, results, fields) {
//     if (results.error) {
//         return responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.BAD_REQUEST)
//     }
//     else {
//         console.log("Email send on your Mail :)")
//         //sendmail.ab()
//         return responce.sendResponse(res, 'Driver registered sucessfully', status_code.STATUS_CODES.SUCCESS)
//     }
//     // });
// }
// module.exports.logout = function (req, res) {
//     return responce.sendResponse(res, 'Driver successfully logout', status_code.STATUS_CODES.SUCCESS)
// }