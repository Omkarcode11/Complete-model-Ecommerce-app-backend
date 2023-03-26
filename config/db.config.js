// const { Sequelize } = require('sequelize');

// module.exports = sequelizeCon;
const developmentInstance = {
  DB: 'eshop',
  USER: 'root',
  PASSWORD: 'omkar',
  dialect: 'mysql',
  HOST : "localhost",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const testInstance = {
  DB: 'ecom_test_db',
  USER: 'root',
  PASSWORD: 'omkar',
  dialect: 'mysql',
  HOST: 'localhost',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = {
  development: developmentInstance,
  test: testInstance,
};
