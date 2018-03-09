const winston = require('winston');
const { ref } = require('../config/firebase');

/**
 * Store a job offer in the database.
 * @param {*} offer
 */
function saveOffer(offer) {
  winston.info('jobs-persistence:saveOffer', offer);
  return ref
    .child('jobs')
    .child(offer.id)
    .set(offer);
}

/**
 * Get a job offer from the database.
 * @param {*} offer
 */
function getOffer(offer) {
  winston.info('jobs-persistence:getOffer', offer);
  return getOfferById(offer.id);
}

/**
 * Get a job offer from the database.
 * @param {string} id
 */
function getOfferById(id) {
  winston.info('jobs-persistence:getOfferById', id);
  return ref
    .child('jobs')
    .child(id)
    .once('value')
    .then(snapshot => snapshot.val());
}


/**
 * Add a new vote to an existing offer.
 *
 * The votes are indexed by userID this way we prevent an user from voting twice.
 */
function vote(jobId, uid, type) {
  winston.info('jobs-persistence:vote', { jobId, uid, type });
  return ref
    .child('jobs')
    .child(jobId)
    .child('votes')
    .child(uid)
    .set(type);
}

/**
 * Return all entries from the database
 */
function getAll() {
  return ref.child('jobs').once('value').then(data => data.val()).then(Object.values);
}


module.exports = { saveOffer, getOffer, vote, getOfferById, getAll };
