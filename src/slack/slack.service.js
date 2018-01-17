const fetch = require('node-fetch');
const SlackMessage = require('./SlackMessage');
const winston = require('winston');

/**
 * Send a job offer to a slack channel
 */
async function broadcast(offer, slackUrl) {
  winston.info('slack-service:broadcast', { offer, slackUrl });
  const method = 'POST';
  const slackMessage = serialize(offer);
  const body = JSON.stringify(slackMessage);
  return fetch(slackUrl, { method, body });
}

function serialize(offer) {
  return new SlackMessage(offer).content;
}



module.exports = { broadcast, serialize };