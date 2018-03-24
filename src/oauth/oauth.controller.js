const winston = require('winston');
const teamsController = require('../teams/teams.controller');
const Urls = require('../constants/urls');

const CLIENT_ID =  process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = process.env.SLACK_REDIRECT_URI;

/**
  * Get authorize url for a given code
  * @param {string} code Slack authorization code
 */
function getAuthorizedURL(code) {
  winston.log('oauth-controller:getAuthorizedURL', { code });

  return `${Urls.OAUTH_ACCESS}?\
          client_id=${CLIENT_ID}&\
          client_secret=${CLIENT_SECRET}&\
          code=${code}&\
          redirect_uri=${REDIRECT_URI}`;
}

/**
  * Save credentails response to the database
  * @param {*} credentials Slack team credentials
 */
async function saveCredentials(credentials) {
  winston.log('oauth-controller:saveCredentials', { credentials });

  await teamsController.save(credentials);
}

module.exports = { getAuthorizedURL, saveCredentials };
