const winston = require('winston');
const persistence = require('./jobs.persistence');

/**
 * Add a new job into the system if not exists.
 *
 * @param {object} offer
 */
async function postJob(offer) {
  winston.info('jobs-controller:postJob', offer);
  const existingOffer = await persistence.getOffer(offer);
  if (!existingOffer) {
    return persistence.saveOffer(offer);
  }
  return Promise.resolve();
}

/**
 * Add a new vote to an offer.
 *
 * @param {object} offer
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
function _createPublicJob(job) {
  return {
    createdAt: job.createdAt,
    description: job.description,
    link: job.link,
    votes: {
      upvotes: (job.votes && Object.values(job.votes).filter(text => text === 'upvote').length) || 0,
      downvotes: (job.votes && Object.values(job.votes).filter(text => text === 'downvote').length) || 0,
    },
    meta: job.meta
  };
}

module.exports = { vote, postJob, getAll };
