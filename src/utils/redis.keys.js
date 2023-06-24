const rediskeys = {
  preComputedFeed: (user)=>{
    return `precomputedfeed:${user}`;
  },
};

module.exports = rediskeys;
