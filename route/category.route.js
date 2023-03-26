const express = require('express');
let categoriesRoute = express.Router();
let requestValidator = require('../middleware/RequesterValidator');

let categoriesMethod = require('./../controller/categories.controller');

categoriesRoute.get('/', categoriesMethod.getAllCategories);
categoriesRoute.get('/:id', [requestValidator.validateReqForCategoryId], categoriesMethod.getCategoriesById);
categoriesRoute.post('/', [requestValidator.validateReqForCategoryName], categoriesMethod.addValue);
categoriesRoute.delete('/:id', [requestValidator.validateReqForCategoryId], categoriesMethod.deletecategory);
categoriesRoute.put('/:CatId', [requestValidator.validateReqForCategoryName], categoriesMethod.updateCategory);
module.exports = categoriesRoute;
