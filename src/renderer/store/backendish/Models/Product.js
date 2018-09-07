module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'SIN DEFINIR'
    },
    stock: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
