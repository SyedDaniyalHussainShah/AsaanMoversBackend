const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose= require('mongoose');

module.exports = function (req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('No token provided.');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        const id = new mongoose.Types.ObjectId();
        console.log(id);
        if(decoded.role!='STAFF' || decoded.role != "ADMIN"){
           return res.status(400).send('Invalid token.');
        }
        req.user = decoded;
        next();
    } 
    catch (error) {
        res.status(400).send('Invalid token.')
    }
}