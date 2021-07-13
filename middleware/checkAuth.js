const jwt = require('jsonwebtoken');
require('dotenv').config();

var secret_key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {

    try {
        // How token can be managed to prevent leakage?
        var token = req.headers.authorization;
        const decoded = jwt.verify(token, secret_key);
        req.userData = decoded;
        req.passengerID = req.userData.passengerID
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }
};