const db = require("../database/mongo")

const comment = db.model("comment",{
    username: String,
    comment: String,
})

module.exports = comment