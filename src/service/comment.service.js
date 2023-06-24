const CommentModel = require('../model/comment.model');
const logger = require('../utils/logger');

const commentservice= {
  createComment: async (commentdata)=>{
    try {
      const comment= new CommentModel(commentdata);
      await comment.save();
    } catch (err) {
      logger.error(err);
      throw new Error('error while saving comment');
    }
  },

  deleteComment: async (commentid)=>{
    try {
      await CommentModel.findOneAndDelete(commentid);
    } catch (err) {
      logger.error(err);
      throw new Error('error while deleting comment');
    }
  },

  getCommentList: async (postid)=>{
    try {
      return await CommentModel.find({postid: postid});
    } catch (err) {
      logger.error(err);
      throw new Error('error while fetching list of comments');
    }
  },

  getCommentCount: async (postid) => {
    try {
      return await CommentModel.find({postid: postid}).count();
    } catch (err) {
      logger.error(err);
      throw new Error('error while getting comment count');
    }
  },
};

module.exports= commentservice;
