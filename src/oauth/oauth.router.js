const winston = require('winston');
const controller = require('./oauth.controller');
const service = require('./oauth.service');

/**
 * Handle authorized login and save team credentials
 */
async function login(req, res) {
  winston.log('oauth-router:login', { payload: req.query.code });

  const code = req.query.code;
  const URL = controller.getAuthorizeURL(code);

  try {
    const authorizeResponse = await service.authorize(URL);
    const credentials = await authorizeResponse.json();
    const response = await controller.saveCredentials(credentials);

    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { login };
