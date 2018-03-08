const fetch = require('node-fetch');
const winston = require('winston');

async function authorize(url) {
  winston.info('oauth-service:authorize', { url });
  const method = 'GET';
  return fetch(url, { method });
}

module.exports = { authorize };
