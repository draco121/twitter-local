const redisClient = require('../database/redis');
const redisKeys = require('..//utils/redis.keys');
const logger = require('..//utils/logger');
const networkService = require('../service/network.service');
const postService = require('./post.service');
const rediskeys = require('..//utils/redis.keys');
const feedservice = {

  // pre computes feed whenever a user uploads a new post
  // this function deals with updating the feed of
  // all followers of that perticular user
  preComputeFeed: async (username, post) => {
    try {
      let feed =[];
      feed = await redisClient.get(redisKeys.preComputedFeed(username));
      feed.push(post);
      await redisClient.set(redisKeys.preComputedFeed(username), feed);
      logger.info(`feed updated successfully for ${username}`);
    } catch (err) {
      logger.error(`error occured while updating feed: ${err}`);
    }
  },

  // If none of the followers have updated any post then this will
  // deal with generating a feed for that user
  createFeed: async (username) => {
    try {
      let following = [];
      let posts = [];
      // TODO: expose this method as grpc interface
      // when decomosing the app to microservices
      following = networkService.getFollowing(username);
      let limit = following.length/20;
      if (limit<5) {
        limit = 5;
      }
      if (following.length != 0) {
        following.forEach((username) => {
          posts = postService.getLatestPosts(username, limit);
        });
      }
      await redisClient.set(redisKeys.preComputedFeed(username,
          JSON.stringify(posts)));
    } catch (err) {
      logger.error(`error creating feed for user: ${username}: ${err}`);
    }
  },

  getFeed: async (username, page, limit) => {
    let feed = await redisClient.get(rediskeys.preComputedFeed(username));
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (feed | feed.length == 0) {
      await this.createFeed();
      feed = await redisClient.get(rediskeys.preComputedFeed(username));
    }
    const paginatedFeed = feed.slice(startIndex, endIndex);
    const result = {
      page,
      limit,
      totalPosts: feed.length,
      totalPages: Math.ceil(feed.length / limit),
      data: paginatedFeed,
    };
    return result;
  },
};

module.exports = feedservice;
