const fetch = require('node-fetch');
const SlackMessage = require('./SlackMessage');
const winston = require('winston');

/**
 * Send a job job to a slack channel
 */
async function broadcast(job, slackUrl) {
  winston.info('slack-service:broadcast', { job, slackUrl });
  const method = 'POST';
  const slackMessage = serialize(job);
  const body = JSON.stringify(slackMessage);
  return fetch(slackUrl, { method, body });
}

function serialize(job) {
  return new SlackMessage(job).content;
}



module.exports = { broadcast, serialize };
