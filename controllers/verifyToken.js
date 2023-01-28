const jwt = require('jsonwebtoken')
const { ResponseHandler } = require('../utils');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    const token = authHeader.split(' ')[1];

    if (authHeader) {
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) {
                ResponseHandler(res, data = null, error = 'Token is not valid!', status = 400)
            }
            req.user = user
            next()
        })
    } else {
        ResponseHandler(res, data = null, error = 'You are not authenticated!', status = 401)
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            ResponseHandler(res, data = null, error = 'You are not allowed to do that', status = 403)
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization }