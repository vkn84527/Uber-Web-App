var connection = require('../../database/db_connection');
const sendmail = require('../service/customer_mail')
const responce = require('../common_functions/responses')
const status_code = require('../constants/constants')
const execute_query = require('./db_query').execute_query
const bcryptjs = require('bcryptjs')
const hash_service = require('./hashing');
const jwt = require('jsonwebtoken')
var salt = 10
var secret_key = process.env.SECRET_KEY;

module.exports.register = function (req, res) {

  var today = new Date();
  var hash = hash_service.hash_password(req.body.customer_password)
  hash.then((hash) => {

    var sql_query = 'INSERT INTO customer(customer_name,customer_phone,customer_email,customer_password,created_at,updated_at) values(?,?,?,?,?,?)'
    var values = [req.body.customer_name, req.body.customer_phone, req.body.customer_email, hash, today, today]
    const results = execute_query(sql_query, values)
    //console.log(results)
    results.then((message) => {
      responce.sendResponse(res, 'User registered sucessfully', status_code.STATUS_CODES.SUCCESS)
      console.log("User registered sucessfully.........")
      console.log("Email send on your Mail :)")
      //sendmail.ab2() 
    }).catch((message) => {
      //console.log(message)
      responce.sendResponse(res, 'There are some error with query', status_code.STATUS_CODES.UNAUTHORIZED)
    })
  }).catch((message) => {
    responce.sendResponse(res, 'Password hasing Error', status_code.STATUS_CODES.UNAUTHORIZED)
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
      //console.log( message[0].customer_password)
      var result = hash_service.compare_password(req.body.customer_password, message[0].customer_password);
      //console.log(result)
      result.then((message) => {
        responce.sendResponse(res, "LogIn SuccessFully", status_code.STATUS_CODES.SUCCESS);
      }).catch((message) => {
        responce.sendResponse(res, "Invalid password", status_code.STATUS_CODES.UNAUTHORIZED);
      })
    }
  })
    .catch((message) => {
      responce.sendResponse(res, "Some Error", status_code.STATUS_CODES.BAD_REQUEST);
    })
}


module.exports.logout = function (req, res) {
  return responce.sendResponse(res, 'successfully logout', status_code.STATUS_CODES.SUCCESS)
}



// module.exports.login = function (req, res) {

//   var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
//   var values = [req.body.customer_email]
//   var results = execute_query(sql_query, values, (err, results) => {

//     if (results.length === 0) {
//       return response.sendResponse(res, "Wrong Credentials", status_code.STATUS_CODES.UNAUTHORIZED);
//     }
//     else {
//       var result = hash_service.compare_password(req.body.customer_password, results[0].customer_password);
//       if (result) {
//         const token = jwt.sign({
//           customer_email: req.body.customer_email,
//           customer_password: results[0].customer_password
//         },
//           secret_key);
//         return res.status(200).json({
//           message: 'Auth Successful',
//           token: token,
//           customer_email: req.body.customer_email,
//           customer_password: results[0].customer_password
//         });
//       }
//       if (err) {
//         res.json({
//           message: "Some error"
//         })
//       }
//       else {
//         return responce.sendResponse(res, "Invalid customer_password", status_code.STATUS_CODES.UNAUTHORIZED);
//       }

//     }
//   })
// }






// module.exports.login = function (req, res,error) {

//   var sql_query = 'SELECT * FROM customer WHERE customer_email = ?'
//   var values = [req.body.customer_email]
//   var results = execute_query(sql_query, values)

//   // var customer_email = req.body.customer_email;
//   //var customer_password = req.body.customer_password;

//   // connection.query('SELECT * FROM customer WHERE customer_email = ?', [customer_email], function (error, results, fields) {
//     if  (results.error) {
//       return responce.sendResponse(res,'There are some error with query',status_code.STATUS_CODES.UNAUTHORIZED)
//     } 
//     else {
//       if (results.length > 0) {
//         if (customer_password == results[0].customer_password) {
//           return responce.sendResponse(res,'successfully login',status_code.STATUS_CODES.SUCCESS)
//         } 
//         else {
//           return responce.sendResponse(res,"Email or customer_password does not match",status_code.STATUS_CODES.BAD_REQUEST)
//         }
//       }
//       else 
//       {
//         return responce.sendResponse(res,"Email does not exits",status_code.STATUS_CODES.NOT_FOUND)
//       }
//     }
//   //});
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