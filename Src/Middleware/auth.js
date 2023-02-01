const jwt = require('jsonwebtoken');
const config = require('../Config/config');

function authenticateToken(payload) {
    try{
        const accessToken = jwt.sign(payload, config.Access_Token_Secret, {expiresIn: '60d'})
        const refreshToken = jwt.sign(payload, config.Refresh_Token_Secret)
        return {accessToken: accessToken, refreshToken: refreshToken}
    }
    catch(err){
        return err
    }
}


function verifyToken(req, res, next) {
    try{
        const authHeader = req.header('Cookie');
        const token = authHeader && authHeader.split('=')[1];
        if(token == null) return res.status(406).send('Access Denied');

        const verified = jwt.verify(token, config.Access_Token_Secret)
        req.user = verified;
        next();     
    }
    catch(err){
        res.status(406).send('Invalid Token');
    }
}

module.exports.verifyToken = verifyToken;
module.exports.authenticateToken = authenticateToken;