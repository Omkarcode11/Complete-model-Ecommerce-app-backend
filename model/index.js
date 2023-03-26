const sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development"
const dbConfig = require('./../config/db.config')[env]
let db = {};
const { DataTypes } = require('sequelize');
db.connection = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases : 0
});

// const dbConnection = require('./../config/db.config');
db.sequelize = sequelize;
db.roles = require('./Role')(db.connection, DataTypes);
db.user = require('./User')(db.connection, DataTypes);
db.product = require('./Products')(db.connection, DataTypes);
db.cart = require('./Cart')(db.connection, DataTypes);
db.category = require('./Category')(db.connection, DataTypes);

//=======================---------------------------------===============

db.roles.belongsToMany(db.user, {
  through: 'user_roles',
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.roles, {
  through: 'user_roles',
  foreignKey: 'userId',
  otherKey: 'roleId',
});

//=----------------------------------------------------------

db.product.belongsToMany(db.cart, {
  through: 'cart_products',
  foreignKey: 'productId',
  otherKey: 'cartId',
});

db.cart.belongsToMany(db.product, {
  through: 'cart_products',
  foreignKey: 'cartId',
  otherKey: 'productId',
});

db.Roles = ['user', 'admin'];

module.exports = db;
