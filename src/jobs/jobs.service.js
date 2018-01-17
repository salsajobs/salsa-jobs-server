const URL_REGEX = /(?:http|https):\/\/((?:[\w-]+)(?:\.[\w-]+)+)(?:[\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/;
const crypto = require('crypto');

/**
 * Create a job object from a {@link https://api.slack.com/slash-commands|slack payload}
 * 
 * @param {object} slackMessage - The object passed passed by the slack api
 * @param {string} slackMessage.text - The message raw text 
 * @param {string} slackMessage.channel_id - The channel id where the message was created
 * @param {string} slackMessage.channel_id - The id of the user that created the message
 * 
 * @return {Job}
 */
function createJob(slackMessage) {
  const job = {};

  job.link = getLink(slackMessage.text);
  job.id = hash(job.link);
  job.createdAt = Date.now();
  job.text = slackMessage.text;
  job.description = _getDescription(job.text, job.link);
  job.meta = slackMessage;

  return job;
}

/**
 * Get url links from a given text string
 * 
 * @param {string} text 
 */
function getLink(text) {
  try {
    const link = text.match(URL_REGEX);
    return link[0];
  } catch (err) {
    throw new Error(`Job offers must have a link. [${text}]`);
  }
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


module.exports = { createJob, getLink, hash };