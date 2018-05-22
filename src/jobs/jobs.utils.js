const winston = require('winston');
const Commands = require('../constants/commands');
const Regex = require('../constants/regex');

/**
 * Get url links from a given text string
 *
 * @param {string} text
 */
function getLink(text) {
  winston.info('jobs-utils:getLink', { text });

  try {
    const link = text.match(Regex.URL);
    return link[0];
  } catch (err) {
    throw new Error(`Job jobs must have a link. [${text}]`);
  }
}

/**
 * Get the type of command sent by the user
 *
 * @param {string} text
 */
function getCommand(text) {
  winston.info('jobs-utils:getCommand', { text });

  if (text.match(Regex.EMPTY)) return Commands.EMPTY;
  if (text.match(Regex.HELP)) return Commands.HELP;
  if (text.match(Regex.JOB_LIST)) return Commands.JOB_LIST;
  return Commands.CREATE_JOB;
}

module.exports = { getLink, getCommand };
