var bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
var salt = 10;
var secret_key = process.env.SECRET_KEY;



module.exports.hash_password = (customer_password,callback) => {
    return bcryptjs.hash(customer_password, salt, (err, hash) => {
            if (err) {
                return callback(err)
            }
            else {
                return callback(null,hash)
            }
        });
}


module.exports.compare_password = (customer_password, password_in_database,callback) => {
    return bcryptjs.compare(customer_password, password_in_database, (err, result) => {
        //console.log(result)
            if (result) {
                return callback(null,true)
            }
            else if (!result) {
                return callback(null,false)
            }
            else {
                return callback(err)
            }
        })
}

