const postService = require('../service/post.service');
// eslint-disable-next-line new-cap
const router = require('express').Router();
const logger = require('../utils/logger');
const jwtUtils = require('../utils/jwt-utils');
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
    res.status(401).send();
  }
});

router.post('/create', async (req, res)=>{
  try {
    const postdata = req.body;
    await postService.createpost(postdata);
    res.send('post created');
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.delete('/delete/:postid', (req, res)=>{
  try {
    const postid = req.params.postid;
    postService.removePost(postid);
    res.send('post removed');
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/list/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const posts = await postService.getPostList(username);
    res.json(posts);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

router.get('/:postid', async (req, res) => {
  try {
    const postid = req.params.postid;
    const posts = await postService.getPostById(postid);
    res.json(posts);
  } catch (err) {
    logger.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;

