module.exports = (sequelizeCon, DataTypes) => {
  let User = sequelizeCon.define('users', {
    userName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  return User;
};
