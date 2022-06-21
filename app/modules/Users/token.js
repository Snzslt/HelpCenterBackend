const jwt = require('jsonwebtoken');
require('dotenv').config();
exports.findToken = (req) => {
    if (!("authorization" in req.headers)) {
        return false;
    };
    const {
        authorization
    } = req.headers;
    const [prefix, token] = authorization.split(' ');

    if (!token) {
        return false;
    };
    return token;
}
exports.generate = (params, expiresTime) => {
    return jwt.sign(params, process.env.SECRET_KEY, { expiresIn: expiresTime });
};