module.exports = (sequelizeCon,DataTypes)=>{

let Cart = sequelizeCon.define(
  'cart',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cost: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    timestamps: false,
  }
);

return Cart;
}