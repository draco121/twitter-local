const likeModel = require ("../model/like.model")

const likeservice ={
    likePost: async (username,postid)=>{
        await likeModel.findByIdAndUpdate(postid,{$addToSet:{likes: username}})
    },

    unlikePost: async (username,postid)=>{
        await likeModel.findByIdAndUpdate(postid,{$pull:{likes: username}})
    },

    countLike: async (postid)=>{
        return await networkModel.aggregate().match({_id:postid}).project({likescount:{$size:"$likes"}})
    }
}

module.exports = likeservice