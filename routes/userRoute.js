const router = require('express').Router()
const { register, login } = require('../controllers/auth')

// routes

router.post('/register', register)

router.post('/login', login)

module.exports = router


/*
 User routes, featuring:
 - /user/login (POST)
    data: email, password
- /user/register (POST) 
    data: username, email, password
- /user (GET) [requires auth token]


Token will be created using the user id, time, username => token
*/