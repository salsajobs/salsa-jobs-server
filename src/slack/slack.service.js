const fetch = require('node-fetch');
const JobMessage = require('./JobMessage');
const JobListMessage = require('./JobListMessage');
const winston = require('winston');

/**
 * Send a job job to a slack channel
 */
async function broadcast(job, slackUrl) {
  winston.info('slack-service:broadcast', { job, slackUrl });
  
  const method = 'POST';
  const slackMessage = serializeJob(job);
  const body = JSON.stringify(slackMessage);
  return fetch(slackUrl, { method, body });
}

function serializeJob(job) {
  return new JobMessage(job).content;
}

function serializeJobList(list) {
  return new JobListMessage(list).content;
}

module.exports = { broadcast, serializeJob, serializeJobList };
