const winston = require('winston');
const persistence = require('./teams.persistence');

/**
 * Add a new team into the system if not exists.
 *
 * @param {object} offer
 */
async function save(team) {
  winston.info('teams-controller:postTeam', team);
  const slackTeam = persistence.saveTeam(team);

  return Promise.resolve(slackTeam);
}

async function getIncomingWebhookUrl(teamId) {
  winston.info('teams-controller:getIncomingWebhookUrl', teamId);
  const team = await persistence.getTeamById(teamId);

  return Promise.resolve(team.incoming_webook.url);
}

module.exports = { save, getIncomingWebhookUrl };
