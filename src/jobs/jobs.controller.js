const winston = require('winston');
const persistence = require('./jobs.persistence');

/**
 * Add a new job into the system if it does not exists.
 *
 * @param {object} offer
 */
async function postJob(offer) {
  winston.info('jobs-controller:postJob', offer);
  const existingOffer = await persistence.getOffer(offer);
  if (!existingOffer) {
    return persistence.saveOffer(offer);
  }
  return Promise.resolve(existingOffer);
}

/**
 * Add a new vote to an offer.
 *
 * @param {object} offerId
 * @param {string} uid
 * @param {string} type
 */
async function vote(offerId, uid, type) {
  winston.info('jobs-controller:postJob', { offerId, uid, type });
  await persistence.vote(offerId, uid, type);
  return persistence.getOfferById(offerId);
}

/**
 * List all jobs in the database.
 */
async function getAll() {
  winston.info('jobs-controller:getAll');
  const jobs = await persistence.getAll();
  return jobs.map(_createPublicJob);
}

/**
 * Transform an job from the database to a public object availiable in the API.
 */
function _createPublicJob(job, teamId) {
  return {
    createdAt: job.createdAt,
    description: job.description,
    link: job.link,
    votes: {
      upvotes: _getVotes.call(this, teamId, job.votes, 'upvote'),
      downvotes: _getVotes.call(this, teamId, job.votes, 'downvote')
    },
    meta: job.meta
  };
}

function _getVotes(teamId, votes, voteType) {
  return (votes &&
    _filterByTeamId.call(this, Object.keys(votes), teamId) &&
    _filterByVoteType.call(this, Object.values(votes), voteType)).length || 0;
}

function _filterByTeamId(votes, teamId) {
  return votes.filter(vote => vote.includes(teamId));
}

function _filterByVoteType(votes, type) {
  return votes.filter(vote => vote === type);
}

module.exports = { vote, postJob, getAll };
