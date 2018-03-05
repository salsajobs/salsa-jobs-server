const winston = require('winston');
const controller = require('./oauth.controller');
const teamsController = require('../teams/teams.controller');
const service = require('./oauth.service');

/**
 * Handle authorized login
 */
async function login(req, res) {
  winston.log('oauth-router:login');
  const code = req.query.code;
  const URL = controller.getAuthorizeURL(code);

  try {
    const credentials = await service.authorize(URL);
    await teamsController.save(credentials);
    res.status(200).send('saved');
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { login };
