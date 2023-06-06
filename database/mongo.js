const db = require('mongoose')
const config = require("../utils/config")
db.connect(config.DATABASE_URL)

module.exports = db