const config = require('../config');
const Logger = require('../utils/logger');
const persistence = require('./jobs.persistence');
const SlackMessage = require('../slack/SlackMessage');
const SlackResponse = require('../slack/SlackResponse');

/**
 * Add a new job to the system.
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
function postJob(offer) {
  Logger.log('Jobs:controller:postJob', { offer });
  return persistence.saveOffer(offer);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 * @param {string} offer.text - The url where the offer is announced.
 */
function getJob(offer) {
  Logger.log('Jobs:controller:getJob', { offer });
  return persistence.getOffer(offer);
}

function getAll() {
  Logger.log('Jobs:controller:getAll');
  return persistence.getAll()
    .then(jobs => {
      return jobs.map(job => {
        return {
          createdAt: job.createdAt,
          description: job.description,
          link: job.link,
          votes: {
            upvotes: (job.votes && Object.values(job.votes).filter(text => text === 'upvote').length) || 0,
            downvotes: (job.votes && Object.values(job.votes).filter(text => text === 'downvote').length) || 0,
          },
          meta: job.meta
        }
      });
    });
}

/**
 * Check first if the job offer already exists.
 * If so, broadcast it.
 * Otherwise, add it first to the database and then broadcast it.
 *
 * @param {object} offer
 */
function broadcast(responseUrl, offer) {
  Logger.log('Jobs:controller:broadcast', { responseUrl, offer });

  return getJob(offer)
    .then((dataSnapshot) => {
      Logger.log('Jobs:controller:broadcast:getJob', { dataSnapshot });
      const existingOffer = dataSnapshot.val();

      return existingOffer
        ? broadcastSlack(responseUrl, existingOffer)
        : postJob(offer).then(() => broadcastSlack(responseUrl, offer));
    });
}

/**
 * Add a new vote to an offer
 *
 * @param {object} offer
 */
function vote(url, type, offer, uid) {
  Logger.log('Jobs:controller:vote', { url, type, offer, uid });
  return persistence.vote(url, type, offer, uid);
}

/**
 * Get a job offer from the system
 *
 * @param {object} offer
 */
function broadcastSlack(responseUrl, offer) {
  Logger.log('Jobs:controller:broadcastSlack', { responseUrl, offer });
  const slackMessage = new SlackMessage(offer);
  return slackMessage.broadcast(responseUrl);
}

/**
* Send feedback to the user
* @param {*} requestUrl
* @param {*} message
*/
function broadcastSlackVoteResponse(responseUrl, offer, vote) {
  Logger.log('Jobs:controller:broadcastSlackVoteResponse', { responseUrl, offer, vote });
  const slackResponse = new SlackResponse(offer, vote);
  return slackResponse.broadcast(responseUrl);
}

module.exports = { broadcast, vote, postJob, getJob, broadcastSlack, broadcastSlackVoteResponse, getAll };
