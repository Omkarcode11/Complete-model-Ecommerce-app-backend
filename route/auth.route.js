let express = require('express');
let authController = require('./../controller/auth.controller');
let app = express();
let authRoute = express.Router();
let verify = require('../middleware/VerifySignUp');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'token, Origin, Content-Type, Accept');
  next();
});

authRoute.post('/signup', [verify.checkDuplicateUserName], authController.signup);
authRoute.post('/signin', authController.signin);

module.exports = authRoute;
