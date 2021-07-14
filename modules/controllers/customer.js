const sendmail = require('../service/customer_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const hash_service = require('../common_functions/hashing');
const jwt = require('jsonwebtoken')
const checkAuth = require('../../middleware/checkAuth')
var salt = 10
var secret_key = process.env.secret_key


module.exports.register = function (req, res) {

  var today = new Date();
  var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
  var values = [req.body.customer_email]
  var results = execute_query(sql_query, values)
  results.then((mess) => {
    if (mess.length !== 0) {
      return responce.sendResponse(res, "Email already Registered", status_code.STATUS_CODES.BAD_REQUEST);
    }
    else {
      var hash = hash_service.hash_password(req.body.customer_password)
      hash.then((hash) => {
        var sql_query = 'INSERT INTO customer(customer_name,customer_phone,customer_email,customer_password,created_at,updated_at) values(?,?,?,?,?,?)'
        var values = [req.body.customer_name, req.body.customer_phone, req.body.customer_email, hash, today, today]
        const results = execute_query(sql_query, values)
        //console.log(results)
        results.then((message) => {
          console.log("User registered sucessfully.........")
          console.log("Email send on your Mail :)")
          //sendmail.ab2() 

          const user = { customer_email: req.body.customer_email, customer_id: message.insertId }
          token = jwt.sign(user, secret_key)
          responce.sendtokencustomerResponse(res, 'User registered sucessfully', token, req.body.customer_email, message.insertId, status_code.STATUS_CODES.SUCCESS)

        }).catch((message) => {
          //console.log(message)
          responce.sendResponse(res, 'Please Enter all Required Filed', status_code.STATUS_CODES.UNAUTHORIZED)
        })
      }).catch((message) => {
        responce.sendResponse(res, 'Password hasing Error', status_code.STATUS_CODES.UNAUTHORIZED)
      })
    }
  }).catch((mess) => {
    responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
  })
}

module.exports.login = function (req, res) {
  var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
  var values = [req.body.customer_email]
  var results = execute_query(sql_query, values)
  results.then((message) => {
    //console.log(message)
    if (message.length === 0) {
      return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.BAD_REQUEST);
    }
    else {
      const user = { customer_email: req.body.customer_email, customer_id: message[0].customer_id }
      var result = hash_service.compare_password(req.body.customer_password, message[0].customer_password);
      result.then((msg) => {
        if (msg) {
          token = jwt.sign(user, secret_key)
          responce.sendtokencustomerResponse(res, 'Auth Successful', token, req.body.customer_email, message[0].customer_id, status_code.STATUS_CODES.SUCCESS)
        }
      }).catch((msg) => {
        return responce.sendResponse(res, "Invalid password", status_code.STATUS_CODES.UNAUTHORIZED);
      })
    }
  }).catch((message) => {
    responce.sendResponse(res, "Some Error", status_code.STATUS_CODES.BAD_REQUEST);
  })
}


module.exports.logout = function (req, res) {
  return responce.sendResponse(res, 'successfully logout', status_code.STATUS_CODES.SUCCESS)
}







// module.exports.login = function (req, res) {
//   var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
//   var values = [req.body.customer_email]
//   var results = execute_query(sql_query, values)
//   results.then((message) => {
//     const user = { customer_email: req.body.customer_email, customer_id: message[0].customer_id }
//     //console.log(message)
//     if (message.length === 0) {
//       return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.BAD_REQUEST);
//     }
//     else {
//       //console.log( message[0].customer_password)
//       var result = hash_service.compare_password(req.body.customer_password, message[0].customer_password);
//       result.then((msg) => {
//         if (msg) {
//           const token = jwt.sign(user, secret_key);
//           //res.json({ access_token: token })
//           return res.status(200).json({
//             Message: 'Auth Successful',
//             Access_token: token,
//             Customer_Email: req.body.customer_email,
//             customer_id: message[0].customer_id
//           });
//         }
//       }).catch((msg) => {
//         return responce.sendResponse(res, "Invalid password", status_code.STATUS_CODES.UNAUTHORIZED);
//       })
//     }
//   }).catch((message) => {
//     responce.sendResponse(res, "Some Error", status_code.STATUS_CODES.BAD_REQUEST);
//   })
// }







// module.exports.login = function (req, res) {
//   var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
//   var values = [req.body.customer_email]
//   var results = execute_query(sql_query, values)
//   results.then((message) => {
//     //console.log(message)
//     if (message.length === 0) {
//       return responce.sendResponse(res, "Email Not Registered", status_code.STATUS_CODES.BAD_REQUEST);
//     }
//     else {
//       //console.log( message[0].customer_password)
//       var result = hash_service.compare_password(req.body.customer_password, message[0].customer_password);
//       //console.log(result)
//       result.then((message) => {
//         responce.sendResponse(res, "LogIn SuccessFully", status_code.STATUS_CODES.SUCCESS);
//       }).catch((message) => {
//         responce.sendResponse(res, "Invalid password", status_code.STATUS_CODES.UNAUTHORIZED);
//       })
//     }
//   })
//     .catch((message) => {
//       responce.sendResponse(res, "Some Error", status_code.STATUS_CODES.BAD_REQUEST);
//     })
// }


// module.exports.register = function (req, res) {
//   var today = new Date();
// //   const salt = bcryptjs.genSaltSync(10)
// // customer_password = bcryptjs.hashSync(req.body.customer_password, salt)
// //   console.log(customer_password)

//   var hash =  hash_service.hash_password(req.body.customer_password);
//   var sql_query = 'INSERT INTO customer(customer_name,customer_email,customer_password ,customer_phone, created_at ,updated_at ) values(?,?,?,?,?,?)'
//   var values = [req.body.customer_name,req.body.customer_email,hash,req.body.customer_phone, today, today]
//   var results = execute_query(sql_query, values)
//   // var customer = {
//   //   "customer_name": req.body.customer_name,
//   //   "customer_email": req.body.customer_email,
//   //   "customer_password": req.body.customer_password,
//   //   "customer_phone": req.body.customer_phone,
//   //   "created_at": today,
//   //   "updated_at": today  
//   // }
//   // connection.query('INSERT INTO customer SET ?', customer, function (error, results, fields) {
//     if (results.error) {
//       return responce.sendResponse(res,'There are some error with query',status_code.STATUS_CODES.UNAUTHORIZED)
//     } 
//     else {
//       console.log("Email send on your Mail :)")
//       //sendmail.ab2()
//       return responce.sendResponse(res,'User registered sucessfully',status_code.STATUS_CODES.SUCCESS) 
//     }
//  // });
// }

// module.exports.logout = function (req, res) {
//   return responce.sendResponse(res,'successfully logout',status_code.STATUS_CODES.SUCCESS) 
//   // res.json({
//   //   status: true,
//   //   message: 'successfully logout'
//   // })
// }