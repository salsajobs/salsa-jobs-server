const fetch = require('node-fetch');
const config = require('../config');

const persistence = require('./jobs.persistence');
const SlackMessage = require('../slack/SlackMessage');

/**
 * Add a new job to the system.
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
function postJob(offer) {
  return persistence.saveOffer(offer);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
function getJob(offer) {
  return persistence.getOffer(offer);
}

/**
 * Check first if the job offer already exists.
 * If so, broadcast it.
 * Otherwise, add it first to the database and then broadcast it.
 *
 * @param {object} offer
 */
function broadcast(offer) {
    return getJob(offer)
      .then((dataSnapshot) => {
        const existingOffer = dataSnapshot.val();

        return existingOffer
          ? broadcastSlack(existingOffer)
          : postJob(offer).then(() => broadcastSlack(offer));
      });
}

/**
 * Add a new upvote to an offer
 *
 * @param {object} offer
 */
function upvote(offer) {
  return persistence.upvote(offer);
}

/**
 * Add a new downvote to an offer
 *
 * @param {object} offer
 */
function downvote(offer) {
  return persistence.downvote(offer);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 */
function broadcastSlack(offer) {
  const slackMessage = new SlackMessage(offer);
  return slackMessage.broadcast();
}

module.exports = { broadcast, upvote, downvote, postJob, getJob, broadcastSlack };
