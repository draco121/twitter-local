// TODO: entrypoint of our application
// start the server
// register the routes
const config = require('./utils/config');
const express = require('express');
const logger = require('./utils/logger');
const authController = require('./controller/auth.controller');
const profileController = require('./controller/profile.controller');
const postcontroller = require('./controller/post.controller');
const networkcontroller = require('./controller/network.controller');
const commentcontroller = require('./controller/comment.controller');
const feedcontroller = require('./controller/feed.controller');
const newPostNotifierSub = require('./events/feed.trigger');
const channels = require('./utils/channels');
const app = express();
const port = config.SERVER_PORT;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});
// Handle errors using the logger
app.use((err, req, res, next) => {
  // Log the error message at the error level
  logger.error(err.message);
  res.status(500).send();
});

app.use('/auth', authController);
app.use('/profile', profileController);
app.use('/post', postcontroller);
app.use('/net', networkcontroller);
app.use('/comment', commentcontroller);
app.use('/feed', feedcontroller);
// eslint-disable-next-line require-jsdoc
function startSubscribers() {
  newPostNotifierSub(channels.newPostNotifierChannel);
}
startSubscribers();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


