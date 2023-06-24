const config = require('../utils/config');
const redisClient = require('redis').createClient({
  url: config.REDIS_URL,
});
const networkService = require('../service/network.service');
const feedService = require('../service/feed.service');
redisClient.connect();
const logger = require('../utils/logger');
const onMessage = async (message) => {
  const post = JSON.parse(message);
  const username = post.username;
  // TODO: implement grpc interface for this method
  // in network service when decomposing to microservices
  const followersDoc = await networkService.getFollowers(username);
  const followers = followersDoc.followers;
  followers.forEach((follower) => {
    feedService.preComputeFeed(follower, post);
  });
};
const newPostNotifierSub =(channel)=>{
  try {
    logger.info(`attempting to subscribe to channel 
    ${channel} in updatefeed trigger` );
    redisClient.subscribe(channel, onMessage);
    logger.info(`channel ${channel } subscribed successfully`);
  } catch (err) {
    logger.error(`error occured while subscribing to 
    channel ${channel} :${err}`);
  }
};

module.exports = newPostNotifierSub;
