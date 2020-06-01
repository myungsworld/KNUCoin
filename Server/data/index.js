const path = require('path')
var Sequelize = require('sequelize')

const env = process.env.MODE_ENV || 'test'
const config = require(path.join(__dirname, '..', 'bin', 'config.json'))[env]
var db = {}

var sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.User = require('./table/user')(sequelize, Sequelize)
db.Coin = require('./table/coin')(sequelize, Sequelize)
db.AutoLogin = require('./table/autologin')(sequelize, Sequelize)

db.User.hasOne(db.Coin, {as: 'fk_user', foreignKey: 'user_id'})

module.exports = db