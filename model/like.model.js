const db = require("../database/mongo")

const like = db.model("like",{
    likes: [String],
    postid: String,
})

module.exports = like