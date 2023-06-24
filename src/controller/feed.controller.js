// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const feedService = require('../service/feed.service');

router.use((req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userinfo = jwtUtils.validateToken(token);
    if (userinfo) {
      // Log an info message for each incoming request
      logger.info(`Received a request for ${req.url} from ${userinfo.data}`);
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
});


router.get('/:username', (req, res) => {
  try {
    const username = req.params.username;
    const limit = req.query.limit;
    const page = req.query.page;
    const feed = feedService.getFeed(username, page, limit);
    res.json(feed);
  } catch (err) {
    res.status(501).send(err.message);
  }
});

module.exports = router;
