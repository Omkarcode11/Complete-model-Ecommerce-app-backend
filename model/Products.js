module.exports = (sequelizeCon, DataTypes) => {
  let Products = sequelizeCon.define(
    'products',
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        get() {
          let name = this.getDataValue('name');
          return name.toUpperCase();
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Products;
};


