const express = require('express')

const userController = require('../controllers/userControllers.js')

const userRouter = express.Router()

userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUsers)


userRouter
    .route('/:id')
    .patch(userController.patchUpdateUsers)
    .put(userController.putUpdateUsers)
    .delete(userController.deleteUsers)

module.exports = userRouter