const express = require('express');
let productsRoute = express.Router();
let productsMethod = require('./../controller/products.controller');
let validator = require('../middleware/RequesterValidator');
let authjwt = require('../middleware/authJwt');

productsRoute.get('/',  productsMethod.getAllProducts);
productsRoute.get('/:Id', productsMethod.getProductById);
productsRoute.get('/fil/:id', productsMethod.getProductByCategoryId);
productsRoute.post('/', productsMethod.addProduct);
productsRoute.delete('/:Id', productsMethod.deleteProduct);
productsRoute.put('/:id', productsMethod.updateProduct);
module.exports = productsRoute;
