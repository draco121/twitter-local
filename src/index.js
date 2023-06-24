// TODO: entrypoint of our application
const newPostNotifierSub = require('./events/feed.trigger');
const startRestServer = require('./interface/rest.interface');
const channels = require('./utils/channels');

// eslint-disable-next-line require-jsdoc
function startSubscribers() {
  newPostNotifierSub(channels.newPostNotifierChannel);
}
startSubscribers();
startRestServer();


