var bcryptjs = require ('bcryptjs')
const jwt = require('jsonwebtoken');
require('dotenv').config();
var salt = 10;
var secret_key = process.env.SECRET_KEY;


module.exports.hash_password = (customer_password) => {
    return new Promise((resolve, reject) => {
        bcryptjs.hash(customer_password, salt, (err, hash) => {
            if (err) return reject(err);
                resolve(hash)           
        })
    })
}
module.exports.compare_password = (customer_password, password_in_database) => {
    return new Promise((resolve, reject) => {
        bcryptjs.compare(customer_password, password_in_database, (err, result) => {
            //console.log(result)
            if (result) {
                resolve(true);
            }
            else {
                reject(err)
            }
        })
    })
}





// module.exports.compare_password = (customer_password, password_in_database) => {
//     return new Promise((resolve, reject) => {
//         bcryptjs.compare(customer_password, password_in_database, (err, result) => {
//             if (result) {
//                 resolve(true);
//             }
//             else if (!result) {
//                 resolve(false);
//             }
//             else {
//                 reject(err)
//             }
//         })
//     })
// }

