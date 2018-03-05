const winston = require('winston');
const { ref } = require('../config/firebase');

/**
 * Store team credentials in the database.
 * @param {*} team
 */
function saveTeam(credentials) {
  winston.info('teams-persistence:saveTeam', credentials);
  return ref
    .child(credentials.team_id)
    .set(credentials);
}

module.exports = { saveTeam };
