module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Log', {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })
}
