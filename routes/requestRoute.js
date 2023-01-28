const router = require('express').Router()
const model = require('../controllers/models')
const request = require('../controllers/request')
const { verifyToken, verifyTokenAndAuthorization } = require('../controllers/verifyToken')

// routes

router.post('/', verifyToken, request)

router.get('/models', verifyTokenAndAuthorization, model)

module.exports = router