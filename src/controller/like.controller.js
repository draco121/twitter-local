const likeservice = require('../service/like.service');
const jwtUtils = require('../utils/jwt-utils');
// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');

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


router.put('/create/:postid', (req, res)=>{
  try {
    const token = req.headers.authorization;
    const postid = req.params.postid;
    const userinfo = jwtUtils.validateToken(token);
    likeservice.likePost(userinfo.data, postid);
    res.sendStatus(201);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/delete/:postid', (req, res)=>{
  try {
    const token = req.headers.authorization;
    const postid = req.params.postid;
    const userinfo = jwtUtils.validateToken(token);
    likeservice.unlikePost(userinfo.data, postid);
    res.sendStatus(201);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/likescount/:postid', async (req, res) => {
  try {
    const postid = req.params.postid;
    const likescount = await likeservice.countLike(postid);
    res.json({likescount: likescount});
  } catch (err) {
    res.status(401).send(JSON.stringify(err));
  }
});

module.exports = router;
