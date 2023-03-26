
module.exports = (sequelizeCon,DataTypes)=>{

  let Categories = sequelizeCon.define('Categories', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    get(){
      let name = this.getDataValue("name")
      return name.toUpperCase()
    }
  },
},{
  timestamps: false
});

return  Categories;
}
