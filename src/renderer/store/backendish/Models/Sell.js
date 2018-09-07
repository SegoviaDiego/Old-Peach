module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Sells', {
    money: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 3),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
