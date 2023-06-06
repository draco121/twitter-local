const db = require("../database/mongo")

const post = db.model("post",{
    username: String,
    post: String,
    date: Date
})

module.exports = post