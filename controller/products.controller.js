const { Op } = require('sequelize');
let express = require('express');
let app = express();
let sequelizeCon = require('./../config/db.config');
const db = require('./../model/index');
// let Products = require('./../model/Products');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let insertProducts = (req, res, next) => {};

{
// let minPrice = req.query.minPrice;
// let maxPrice = req.query.maxPrice;
// let categoryId = req.query.categoryId;
// // let allProducts = [];
// // if (!categoryId) {
// //   allProduct = await Products.findAll();
// // }
// // await Products.findAll({
// //   where: {
// //     categoryId: categoryId,
// //     price: {
// //       [Op.get]: minPrice,
// //       [Op.lte]: maxPrice,
// //     },
// //   },
// // });

// if (categoryId) {
//   allProducts = await filterByCategory(categoryId);
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.write(JSON.stringify(allProducts, null, 2));
//   res.end();
// } else if (minPrice && maxPrice) {
//   allProducts = await filterByPriceRange(minPrice, maxPrice);
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.write(JSON.stringify(allProducts, null, 2));
//   res.end();
// } else {
//   allProducts = await Products.findAll();
//   res.status(200).json(allProducts);
//   res.end();
// }

// let filterByCategory = async (categoryId) => {
//   let product = await Products.findAll({
//     where: {
//       categoryId: categoryId,
//     },
//   });
//   return product;
// };
// let filterByPriceRange = async (minPrice, maxPrice) => {
//   let prices = await Products.findAll({
//     where: {
//       price: {
//         [Op.gte]: minPrice,
//         [Op.lte]: maxPrice,
//       },
//     },
//   });
//   return prices;
// };
}
let getAllProducts = async (req, res, next) => {
  let pro = await db.product.findAll();
  res.status(201).json(pro);
  return;
};
let getProductById = async (req, res, next) => {
  let prod = await db.product.findOne({
    where: {
      id: req.params.Id,
    },
  });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json(prod);
  return;
};
let addProduct = async (req, res, next) => {
  let productToAdd = req.body;
  let product = await db.product.create(productToAdd);
  res.status(201).json(productToAdd);
  return;
};

let deleteProduct = async (req, res, next) => {
  let product = await db.product.destroy({
    where: {
      id: req.params.Id,
    },
  });
  res.send('item was Deleted successfully').status(204);
  res.end();
};

let updateProduct = async (req, res, next) => {
  let prod = await db.product.findByPk(req.params.id);
  let name = req.body.name;
  try {
    if (!prod || !name) {
      throw new Error('Product not found or Product was not Name ');
    }
    let ids = req.params.id;
    let productUpdate = {
      name: req.body.name,
    };
    await db.product.update(productUpdate, { where: { id: ids } });
    res.send('Item added successfully').status(202);
    res.end();
  } catch (err) {
    next(err);
  }
};

let getProductByCategoryId = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = await db.product.findAll({
      attributes: ['name'],
      where: {
        CategoryId: id,
      },
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.json(data);
    res.end();
  } catch (err) {
    next(err);
  }
};

// createTable();
let all = { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct, getProductByCategoryId };

module.exports = all;

// add one for post
//add one for delete
// add one for put with try catch validation
