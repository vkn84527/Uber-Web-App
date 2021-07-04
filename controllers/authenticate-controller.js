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
        console.log(results)
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