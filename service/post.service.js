const postModel = require ("../model/post.model")

const postService ={
    createpost: async(postdata)=>{
        let post = new postModel(postdata)
        await post.save()
    },

    removePost: async (postid) => {
        await postModel.findByIdAndRemove(postid)
    },

    getPostList: async(username)=>{
        return postModel.find({username:username})
    },

    getPostById: async(uaername)=>{
        await postModel.findById(postid)
    }

}

module.exports = postService