const redisClient = require('../database/redis');
const redisKeys = require('..//utils/redis.keys');
const logger = require('..//utils/logger');
const networkService = require('../service/network.service');
const postService = require('./post.service');
const rediskeys = require('..//utils/redis.keys');
// If none of the followers have updated any post then this will
// deal with generating a feed for that user
// eslint-disable-next-line require-jsdoc
async function createFeed(username) {
  try {
    let following = [];
    let posts = [];
    // TODO: expose this method as grpc interface
    // when decomosing the app to microservices
    const followingDoc = await networkService.getFollowing(username);
    following = followingDoc.following;
    let limit = following.length/20;
    if (limit<5) {
      limit = 5;
    }
    if (following.length != 0) {
      for await (const username of following) {
        const temp = await postService.getLatestPosts(username, limit);
        posts = posts.concat(temp);
      }
    }
    await redisClient.set(redisKeys.preComputedFeed(username),
        JSON.stringify(posts));
  } catch (err) {
    logger.error(`error creating feed for user: ${username}: ${err}`);
  }
}
const feedservice = {
  // pre computes feed whenever a user uploads a new post
  // this function deals with updating the feed of
  // all followers of that perticular user
  preComputeFeed: async (username, post) => {
    try {
      let feed = await redisClient.get(redisKeys.preComputedFeed(username));
      feed = JSON.parse(feed);
      if (feed) {
        feed.push(post);
      } else {
        feed = [post];
      }
      await redisClient.set(redisKeys.preComputedFeed(username),
          JSON.stringify(feed));
      logger.info(`feed updated successfully for ${username}`);
    } catch (err) {
      logger.error(`error occured while updating feed: ${err}`);
    }
  },

  getFeed: async (username, page, limit) => {
    let feed = await redisClient.get(rediskeys.preComputedFeed(username));
    feed = JSON.parse(feed);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if (feed | feed.length == 0) {
      await createFeed(username);
      feed = await redisClient.get(rediskeys.preComputedFeed(username));
      feed = JSON.parse(feed);
    }
    const paginatedFeed = feed.slice(startIndex, endIndex);
    remainingFeed = feed.slice(endIndex);
    await redisClient.set(rediskeys.preComputedFeed(username),
        JSON.stringify(remainingFeed));
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
