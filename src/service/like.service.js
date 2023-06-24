const likeModel = require('../model/like.model');
const logger = require('../utils/logger');
const likeservice ={
  likePost: async (username, postid)=>{
    try {
      await likeModel.findByIdAndUpdate(postid, {$addToSet: {likes: username}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while liking the post');
    }
  },

  unlikePost: async (username, postid)=>{
    try {
      await likeModel.findByIdAndUpdate(postid, {$pull: {likes: username}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while unliking the post');
    }
  },

  countLike: async (postid)=>{
    try {
      return await networkModel.aggregate().
          match({_id: postid}).project({likescount: {$size: '$likes'}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching counts of like on post');
    }
  },
};

module.exports = likeservice;
