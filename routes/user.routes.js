const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const passport = require('passport')

router.post('/user/auth', passport.authenticate('login', { session: false }), userController.authUser)
router.post('/user/reg', passport.authenticate('reg', { session: false }), userController.regUser)

module.exports = router
