const fetch = require('node-fetch');
const config = require('../config');

/**
* Send the job offer across the slack channels
* @param {*} offer
*/
function broadcast(offer) {
    const options = { method: 'POST', body: JSON.stringify(offer) };
    return fetch(config.SLACK_BOT_URL, options);
}

module.exports = { broadcast };
