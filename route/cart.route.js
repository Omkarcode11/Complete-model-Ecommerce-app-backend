let express = require('express');
let cartRouter = express.Router();
let cartController = require('./../controller/cart.controller');
let authJwt = require('../middleware/authJwt');

cartRouter.get('/:cartId', [authJwt.VerifyToken], cartController.getCart);
cartRouter.put('/:cartId', cartController.updateCart);
cartRouter.post('/', [authJwt.VerifyToken], cartController.createCart);

module.exports = cartRouter;
