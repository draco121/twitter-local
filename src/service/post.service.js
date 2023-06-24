const PostModel = require('../model/post.model');
const redisClient = require('../database/redis');
const channels = require('../utils/channels');
const logger = require('../utils/logger');
const postService ={
  createpost: async (postdata)=>{
    try {
      const post = new PostModel(postdata);
      await post.save();
      redisClient.publish(channels.newPostNotifierChannel,
          JSON.stringify(post.toJSON()));
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while creating post');
    }
  },

  removePost: async (postid) => {
    try {
      await PostModel.findByIdAndRemove(postid);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while deleting post');
    }
  },

  getPostList: async (username)=>{
    try {
      return await PostModel.find({username: username});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching post list');
    }
  },

  getPostById: async (postid)=>{
    try {
      return await PostModel.findById(postid);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching post by id');
    }
  },

  getLatestPosts: async (username, limit=5) => {
    try {
      return await PostModel.find({username: username})
          .sort({_id: -1}).limit(limit);
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while getting latest posts');
    }
  },

};

module.exports = postService;
