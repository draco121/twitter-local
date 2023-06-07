const db = require("../database/mongo")

const comment = db.model("comment",{
    username: String,
    comment: String,
    postid: String,
    createdate: Date
})

module.exports = comment