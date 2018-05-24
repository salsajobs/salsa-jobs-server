const crypto = require('crypto');
const jobsUtils = require('./jobs.utils');

/**
 * Create a job object from a {@link https://api.slack.com/slash-commands|slack payload}
 *
 * @param {object} slackMessage - The object passed passed by the slack api
 * @param {string} slackMessage.text - The message raw text
 * @param {string} slackMessage.channel_id - The channel id where the message was created
 * @param {string} slackMessage.user_id - The id of the user that created the message
 *
 * @return {Job}
 */
function createJob(slackMessage) {
  const job = {};

  job.link = jobsUtils.getLink(slackMessage.text);
  job.id = hash(job.link);
  job.createdAt = Date.now();
  job.text = slackMessage.text;
  job.description = _getDescription(job.text, job.link);
  job.meta = slackMessage;
  job.votes = [];

  return job;
}

/**
 * Creates a md5 hash for a given string
 * Since firebase cannot store elements using a url as primary key we hash them.
 *
 * @param {string} data
 */
function hash(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

function _getDescription(rawText, link) {
  return rawText.replace(link, '').trim();
}


module.exports = { createJob, hash };
