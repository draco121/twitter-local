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
  const followers = await networkService.getFollowers(username);
  followers.forEach( (follower) => {
    feedService.preComputeFeed(follower, post);
  });
};
const newPostNotifierSub =(channel)=>{
  logger.info(`attempting to subscribe to channel 
  ${channel} in updatefeed trigger` );
  redisClient.subscribe(channel, onMessage);
};

module.exports = newPostNotifierSub;
