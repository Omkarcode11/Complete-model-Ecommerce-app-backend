const express = require('express');
let userRoute = express.Router()
const userController = require('./../controller/user.controller');

userRoute.get('/', userController.getAllUser);

module.exports =  userRoute ;
