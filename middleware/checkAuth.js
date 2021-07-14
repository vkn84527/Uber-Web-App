const jwt = require('jsonwebtoken');
require('dotenv').config();
var secret_key = process.env.secret_key

//var secret_key = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
//console.log(secret_key)
module.exports = (req, res, next) => {
    try {
        var token = req.headers.authorization;
       // console.log(req.headers)
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        req.customer_id = req.userData.customer_id
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};





//const token = jwt.sign(user,secret_key);
//  module.exports.genrateToken =(user,secret_key) =>{
//    jwt.sign(user,secret_key,(err,result)=>{
//     if(result) return result
//         else {return err}
//    })

//  }

//  module.exports.verifyToken = (user,secret_key) =>{
//      jwt.verify(user,secret_key,(err,result)=>{
//         if(result) return true
//         else {return err}
//     })
//   }
//console.log(token)
//const vt=verifyToken(token,secret_key)

// } 

// module.exports= (req, res, next) => {

//     // How token can be managed to prevent leakage?
//     var authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     //console.log(token)
//     if(token == null) return res.status(401).json({
//         message: 'Auth Failed'
//     });

//     jwt.verify(token, secret_key,(err,user)=>{
//      if(err) return res.status(403)
//     req.user = user
//     next();
// })
// };
