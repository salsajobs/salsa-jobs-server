const winston = require('winston');
const controller = require('./oauth.controller');
const service = require('./oauth.service');
const Responses = require('../constants/responses');

/**
 * Handle authorized login and save team credentials
 */
async function login(req, res) {
  winston.info('oauth-router:login', { payload: req.query.code });

  const code = req.query.code;
  const URL = controller.getAuthorizedURL(code);

  try {
    const authorizeResponse = await service.authorize(URL);
    const credentials = await authorizeResponse.json();
    const response = await controller.saveCredentials(credentials);

    winston.info('oauth-router:login:success', { response });

    res
      .status(Responses.Oauth.Login.Success.CODE)
      .redirect(Responses.Oauth.Login.Success.REDIRECT_PATH);
  } catch (error) {

    winston.error('oauth-router:login:error', { error });

    res
      .status(Responses.Oauth.Login.Error.CODE)
      .redirect(Responses.Oauth.Login.Error.REDIRECT_PATH);
  }
}

module.exports = { login };
