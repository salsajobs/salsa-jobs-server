const winston = require('winston');
const teamsController = require('../teams/teams.controller');

const OAUTH_URL = 'https://slack.com/api/oauth.access';
const CLIENT_ID =  process.env.SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET;
const REDIRECT_URI = process.env.SLACK_REDIRECT_URI;

/**
  * Get authorize url for a given code
  *
 */
function getAuthorizeURL(code) {
  winston.log('oauth-controller:getAuthorizeURL', { code });

  return `${OAUTH_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`;
}

/**
  * Save credentails response to the database
  *
 */
async function saveCredentials(credentials) {
  winston.log('oauth-controller:saveCredentials', { credentials });

  await teamsController.save(credentials);
}

module.exports = { getAuthorizeURL, saveCredentials };
