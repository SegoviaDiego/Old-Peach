module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Inouts', {
    type: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    date: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
}
