const firebase = require('firebase');
const winston = require('winston');
const config = require('../config/index');

const DATABASE_NAME = config.DATABASE_NAME;
const FIREBASE_URL = config.FIREBASE_URL;

// Firebase requires a global initialization 
firebase.initializeApp({ databaseURL: FIREBASE_URL });
const FirebaseDatabase = firebase.database();
const ref = FirebaseDatabase.ref(DATABASE_NAME);

/**
 * Store a job offer in the database.
 * @param {*} offer
 */
function saveOffer(offer) {
  winston.info('jobs-persistence:postJob', offer);
  return ref
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
  return ref.child(jobId)
    .child('votes')
    .child(uid)
    .set(type);
}

/**
 * Return all entries from the database
 */
function getAll() {
  return ref.once('value').then(data => data.val()).then(Object.values);
}


module.exports = { saveOffer, getOffer, vote, getOfferById, getAll };
