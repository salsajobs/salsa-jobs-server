const fetch = require('node-fetch');
const config = require('../config');

const persistence = require('./jobs.persistence');
const slackBot = require('./jobs.slackbot');

/**
 * Add a new job to the system.
 * Use the slack bot to forward the message to all subscribed channels.
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
function postJob(offer) {
    return persistence.saveOffer(offer)
      .then(() => slackBot.broadcast(offer));
}


module.exports = { postJob };
