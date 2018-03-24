const winston = require('winston');
const persistence = require('./teams.persistence');
const Errors = require('../constants/errors');

/**
 * Add a new team into the system if it does not exists.
 * @param {object} credentials Slack team credentials
 */
async function save(credentials) {
  winston.info('teams-controller:save', credentials);

  return credentials.hasOwnProperty('team_id')
    ? Promise.resolve(persistence.save(credentials))
    : Promise.reject(new Error(Errors.Teams.MUST_HAVE_TEAM_ID));
}

/**
 * Get incoming webhook url for a given team id
 * @param {string} teamId Slack team id
 */
async function getIncomingWebhookUrl(teamId) {
  winston.info('teams-controller:getIncomingWebhookUrl', teamId);
  const team = await persistence.getTeamById(teamId);

  return _hasIncomingWebhookUrl(team)
    ? Promise.resolve(team.incoming_webhook.url)
    : Promise.reject(new Error(Errors.Teams.WRONG_INCOMING_WEBHOOK_URL));
}

function _hasIncomingWebhookUrl (team) {
  return team &&
    team.hasOwnProperty('incoming_webhook') &&
    team.incoming_webhook.hasOwnProperty('url');
}

module.exports = { save, getIncomingWebhookUrl };
