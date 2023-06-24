const config = require('../utils/config')
const redisClient = require('redis').createClient({
    url: config.REDIS_URL
})
redisClient.connect()
module.exports = redisClient