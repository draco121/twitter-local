const commentservice = require('../service/comment.service');
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


router.put('/create', (req, res)=>{
  try {
    const token = req.headers.authorization;
    const userinfo = jwtUtils.validateToken(token);
    const commentdata= req.body;
    commentdata.username = userinfo.data;
    commentservice.createComment(commentdata);
    res.sendStatus(201);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.delete('/delete/:commentid', (req, res)=>{
  try {
    const commentid= req.params.commentid;
    commentservice.deleteComment(commentid);
    res.send('comment removed');
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/listcomment/:postid', async (req, res)=>{
  try {
    const postid = req.params.postid;
    const comments = await commentservice.getCommentList(postid);
    res.json(comments);
  } catch (err) {
    res.status(401).send(err.message);
  }
});

router.get('/commentcount/:postid', async (req, res) => {
  try {
    const postid = req.params.postid;
    const commentcount = await commentservice.getCommentCount(postid);
    res.json({commentcount: commentcount});
  } catch (err) {
    res.status(401).send(JSON.stringify(err));
  }
});

module.exports = router;
