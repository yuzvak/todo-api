const express = require('express')
const router = express.Router()
const todoController = require('../controller/todo.controller')
const passport = require('passport')

router.get('/todo',  passport.authenticate('jwt', { session: false }), todoController.getTodo)
router.post('/todo', passport.authenticate('jwt', { session: false }),  todoController.createTodo)
router.delete('/todo', passport.authenticate('jwt', { session: false }), todoController.deleteTodo)
router.put('/todo', passport.authenticate('jwt', { session: false }), todoController.updateTodo)

module.exports = router
