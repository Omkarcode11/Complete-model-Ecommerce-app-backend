let express = require('express');
let router = express.Router();
let categoriesRoute = require('./category.route');
let productsRoute = require('./product.route');
let authRoute = require('./auth.route')
let cartRoute = require('./cart.route')
let userRoute = require('./user.route')
router.get('/', (req, res, next) => {
  res.write('Your in Home Page');
  res.end();
});
router.use('/cart' , cartRoute)
router.use('/categories', categoriesRoute);
router.use('/Products', productsRoute);
router.use('/Auth', authRoute);
router.use('/User', userRoute);

module.exports = router;

// ecomm/api/v1/categories/:categoryId
