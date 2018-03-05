const winston = require('winston');
const persistence = require('./teams.persistence');

/**
 * Add a new team into the system if not exists.
 *
 * @param {object} offer
 */
async function save(team) {
  winston.info('teams-controller:postTeam', team);
  const existingTeam = await persistence.getTeam(team);
  if (!existingTeam) {
    return persistence.saveTeam(team);
  }
  return Promise.resolve();
}

module.exports = { save };
