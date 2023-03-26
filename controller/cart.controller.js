const db = require("./../model/index")
let createCart = async (req, res, next) => {
  try {
    await db.cart.create(req.body);
    res.status(200).json({
      message: 'Cart Created',
    });
  } catch (error) {
    res.status(401).json({
      message: 'Some internal error happened',
    });
  }
};

let updateCart = async (req, res, next) => {
  const cartID = req.params.cartId;
  let cartUpdate = await db.cart.findByPk(cartID);
  if (cartUpdate) {
    let productsToAdd = await db.product.findAll({
      where: {
        id: req.body.productsIds,
      },
    });
    if (productsToAdd) {
      await cartUpdate.setProducts(productsToAdd);
      console.log('Products added');
      let totalCost = 0;
      let productsSelected = [];
      let products = await cartUpdate.getProducts();
      for (let i = 0; i < products.length; i++) {
        totalCost += products[i].price;
        productsSelected.push({
          id: products[i].id,
          name: products[i].name,
          cost: products[i].price,
        });
      }
      res.status(200).json({
        id: cartUpdate.id,
        productsSelected,
        totalCost,
      });
    }
  }
};

let getCart = async (req, res, next) => {
  let cart = await db.cart.findByPk(req.params.cartID);
  let totalCost = 0;
  let productsSelected = [];
  let products = await cart.getProducts();
  for (let i = 0; i < products.length; i++) {
    totalCost += products[i].price;
    productsSelected.push({
      id: products[i].id,
      name: products[i].name,
      cost: products[i].price,
    });
  }
  res.status(200).json({
    id: cart.id,
    productsSelected,
    totalCost,
  });
  res.end()
};

module.exports = { createCart, updateCart, getCart };
