const commentModel = require ("../model/comment.model")

const commentservice= {
    createComment: async(commentdata)=>{
        let comment= new commentModel(commentdata)
        await comment.save()
    },

    deleteComment:async(commentid)=>{
        await commentModel.findOneAndDelete(commentid)
    },

    getCommentList:async(postid)=>{
        return await commentModel.find({postid:postid})
    },

    getCommentCount: async(postid) => {
        return await commentModel.find({postid:postid}).count()
    }
}

module.exports= commentservice