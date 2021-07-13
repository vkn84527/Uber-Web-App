const jwt = require('jsonwebtoken');
require('dotenv').config();

var secret_key = process.env.SECRET_KEY;

module.exports = (req, res, next) => {

        // How token can be managed to prevent leakage?
        var authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        const
        if(token ==null) return res.status(401).json({
            message: 'Auth Failed'
        });

        jwt.verify(token, secret_key,(err,user)=>{
         if(err) return res.status(403)
        req.user = user
        next();
    })
};