const NetworkModel = require('../model/network.model');
const logger = require('../src/utils/logger');
const networkService = {
  createNetwork: async (username) => {
    try {
      const network = new NetworkModel({username: username});
      await network.save();
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while creating the network');
    }
  },
  sendFollowRequest: async (myusername, friendusername) => {
    try {
      await networkModel.findOneAndUpdate({username: myusername},
          {$addToSet: {sentrequests: friendusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$addToSet: {recivedrequests: myusername}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while sending follow request');
    }
  },
  withdrawFollowRequest: async (myusername, friendusername) => {
    try {
      await networkModel.findOneAndUpdate({username: myusername},
          {$pull: {sentrequests: friendusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$pull: {recivedrequests: myusername}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while cancelling follow request');
    }
  },
  declineFollowRequest: async (myusername, friendusername) => {
    try {
      await networkModel.findOneAndUpdate({username: myusername},
          {$pull: {recivedrequests: friendusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$pull: {sentrequests: myusername}});
    } catch (err) {
      logger.log(err);
      throw new Error('error occured while declining follow request');
    }
  },
  acceptFollowrequest: async (myusername, friendusername) => {
    try {
      await networkModel.findOneAndUpdate({username: myusername},
          {$addToSet: {followers: friendusername}});
      await networkModel.findOneAndUpdate({username: myusername},
          {$pull: {recivedrequests: friendusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$addToSet: {following: myusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$pull: {sentrequests: myusername}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while accepting follow request');
    }
  },
  unfollow: async (myusername, friendusername) => {
    try {
      await networkModel.findOneAndUpdate({username: myusername},
          {$pull: {following: friendusername}});
      await networkModel.findOneAndUpdate({username: friendusername},
          {$pull: {followers: myusername}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while unfollowing');
    }
  },
  getFollowers: async (username) => {
    try {
      return await networkModel.find({username: username}, 'followers');
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of followers');
    }
  },
  getFollowing: async (username) => {
    try {
      return await networkModel.find({username: username}, 'following');
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of following');
    }
  },
  getSentRequests: async (username) => {
    try {
      return await networkModel.find({username: username}, 'sentrequests');
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of sent requests');
    }
  },
  getRecivedRequests: async (username) => {
    try {
      return await networkModel.find({username: username}, 'recivedrequests');
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching list of recived requests');
    }
  },
  getFollowersCount: async (username) => {
    try {
      return await networkModel.aggregate().
          match({username: username}).
          project({followerscount: {$size: '$followers'}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching count of followers');
    }
  },
  getFollowingCount: async (username) => {
    try {
      return await networkModel.aggregate().
          match({username: username}).
          project({followingcount: {$size: '$following'}});
    } catch (err) {
      logger.error(err);
      throw new Error('error occured while fetching count of followings');
    }
  },
};

module.exports = networkService;
