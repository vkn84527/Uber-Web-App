const jwt = require('jsonwebtoken');
require('dotenv').config();

var secret_key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {

    if (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        })
    }
    var token = req.headers.authorization;
    const decoded = jwt.verify(token, secret_key);
    req.userData = decoded;
    req.customer_password = req.userData.customer_password
    next();
};