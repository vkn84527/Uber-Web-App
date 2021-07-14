const jwt = require('jsonwebtoken');
require('dotenv').config();
var secret_key = process.env.secret_key

module.exports.customer = (req, res, next) => {
    try {
        var token = req.headers.authorization;
        // console.log(req.headers)
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        req.customer_id = req.userData.customer_id
        next();
    } catch (error) {
        //console.log(error)
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};


module.exports.driver = (req, res, next) => {
    try {
        var token = req.headers.authorization;
        // console.log(req.headers)
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        req.customer_id = req.user.customer_id
        next();
    } catch (error) {
        //console.log(error)
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};
