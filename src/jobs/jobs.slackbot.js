const fetch = require('node-fetch');
const config = require('../config');
/**
* Send the job offer across the slack channels
* @param {*} offer 
*/
function broadcast(offer) {
    return fetch(config.SLACK_BOT_URL, { method: 'POST', body: JSON.stringify(offer) });
}

module.exports = { broadcast };