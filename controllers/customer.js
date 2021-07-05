var connection = require('../service/db_connection');
module.exports.authenticate = function (req, res) {
  var customer_email = req.body.customer_email;
  var customer_password = req.body.customer_password;
  connection.query('SELECT * FROM customer WHERE customer_email = ?', [customer_email], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      if (results.length > 0) {
        if (customer_password == results[0].customer_password) {
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
  var customer = {
    "customer_name": req.body.customer_name,
    "customer_email": req.body.customer_email,
    "customer_password": req.body.customer_password,
    "customer_phone": req.body.customer_phone,
    "created_at": today,
    "updated_at": today
  }
  connection.query('INSERT INTO customer SET ?', customer, function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'User registered sucessfully'
      })
    }
  });
}
// module.exports.logout = function (req, res) {
//   res.json({
//     status: true,
//     message: 'User logout sucessfully'
//   })
// }
module.exports.logout = function (req, res) {
  var customer_email = req.body.customer_email;
  var customer_password = req.body.customer_password;
  connection.query('SELECT * FROM customer WHERE customer_email = ?', [customer_email], function (error, results, fields) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      if (results.length > 0) {
        if (customer_password == results[0].customer_password) {
          res.json({
            status: true,
            message: 'successfully logout'
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