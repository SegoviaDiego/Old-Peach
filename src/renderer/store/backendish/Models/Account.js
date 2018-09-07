module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Account', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rank: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  })
}
