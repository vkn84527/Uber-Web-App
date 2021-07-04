var connection = require('../service/db_connection');
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