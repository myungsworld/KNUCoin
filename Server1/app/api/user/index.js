const express = require('express')
const router = express.Router()
const user = require('./user')

module.exports = router

router.post('/check', user.check)
router.post('/signup', user.signup)
router.get('/autologin', user.autologin)
router.post('/login', user.login)