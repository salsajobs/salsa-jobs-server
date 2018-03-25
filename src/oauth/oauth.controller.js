const winston = require('winston');
const teamsController = require('../teams/teams.controller');
const config = require('../config/index');

/**
  * Get authorize url for a given code
  * @param {string} code Slack authorization code
 */
function getAuthorizedURL(code) {
  winston.log('oauth-controller:getAuthorizedURL', { code });

  return `${config.OAUTH_ACCESS}?\
          client_id=${config.CLIENT_ID}&\
          client_secret=${config.CLIENT_SECRET}&\
          code=${code}&\
          redirect_uri=${config.REDIRECT_URI}`;
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
