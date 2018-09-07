import Sequelize from '../Controllers/Sequelize'

export function saveLog(type) {
  Sequelize.con()
    .import('../Models/Log')
    .create({
      type,
      date: new Date().toString()
    })
}
