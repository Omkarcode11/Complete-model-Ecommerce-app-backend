// const { DataTypes } = require('sequelize');
// let sequelizeCon = require('../config/db.config');

module.exports = (sequelizeCon, DataTypes) => {
  const Role = sequelizeCon.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  return Role;
};

// module.exports = Role;
