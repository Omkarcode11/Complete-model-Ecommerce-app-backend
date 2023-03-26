let express = require('express');
let app = express();
let router = require('./route/index');
let ErrorHandler = require('./middleware/ErrorHandler');
const bodyParser = require('body-parser');
const db = require('./model/index');
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler);

// db.category.hasMany(db.product);
// db.product.belongsTo(db.category);

// db.connection.sync().then(() => {
// //   init();
// });

// // async function init() {
// //   await db.connection.sync();
// //   console.log('Categories Table was Created');
// //   insertValueCategory();
// //   insertValueProducts();
// //   insertRoles();
// // }

// async function insertValueCategory() {
//   let Cat = await db.category.bulkCreate([
//     { name: 'Fashion' },
//     { name: 'Mobile' },
//     { name: 'Electronics' },
//     { name: 'Appliance' },
//   ]);
// }
// async function insertValueProducts() {
//   let pro = await db.product.bulkCreate([
//     { name: 'Samsung S20 Ultra', price: 100000, CategoryId: 2 },
//     { name: 'Sony Bravia 5', price: 200000, CategoryId: 4 },
//     { name: 'Jokey Jeans LX43', price: 1500, CategoryId: 1 },
//     { name: 'Lenovo legion 4', price: 100000, CategoryId: 3 },
//     { name: 'Iphone 14 pro max', price: 120000, CategoryId: 2 },
//     { name: 'Mi smart TV MI4289', price: 11000, CategoryId: 4 },
//     { name: 'Adidas Track Tshirt', price: 1000, CategoryId: 1 },
//     { name: 'Lenovo Yoga 6', price: 80000, CategoryId: 3 },
//     { name: 'Samsung refrigerator 3424', price: 45000, CategoryId: 4 },
//     { name: 'Whirlpool refrigerator 234', price: 35000, CategoryId: 4 },
//   ]);
// }
// async function insertRoles() {
//   await db.roles.bulkCreate([
//     { id: 1, name: 'user' },
//     { id: 2, name: 'admin' },
//   ]);
// }

module.exports = app;
