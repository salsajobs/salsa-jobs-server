const crypto = require('crypto');
const firebase = require('firebase');
const FIREBASE_URL = require('../config/index').FIREBASE_URL;
const JOBS_DATABASE = require('../config/index').JOBS_DATABASE;

// Function used to create an unique id
const hash = data => crypto.createHash('md5').update(data).digest("hex");

const FirebaseApp = firebase.initializeApp({ databaseURL: FIREBASE_URL });
const FirebaseDatabase = firebase.database();
const ref = FirebaseDatabase.ref(JOBS_DATABASE);

/**
 * Store a job offer in the database.
 * @param {*} offer
 */
function saveOffer(offer) {
  return ref.child(hash(offer.link)).set(offer);
}

/**
 * Get a job offer from the database.
 * @param {*} offer
 */
function getOffer(offer) {
  return ref.child(hash(offer.link)).once('value');
}

/**
 * Add a new upvote to an existing offer
 * @param {*} offer
 */
function downvote(offer) {
  const upvote = _buildVote.call(this, offer);
  return ref.child(hash(offer.link))
    .child('votes')
    .child('upvotes')
    .push(upvote);
}

/**
 * Add a new downvote to an existing offer
 * @param {*} offer
 */
function upvote(offer) {
  const downvote = _buildVote.call(this, offer);
  return ref.child(hash(offer.link))
    .child('votes')
    .child('downvotes')
    .push(downvote);
}

/**
 * Build offer vote firebase path
 * @param {*} offer
 */
function _buildVote (offer) {
  return `${offer.meta.user_id}/${offer.meta.team_id}`;
}

module.exports = { saveOffer, getOffer, upvote, downvote };
