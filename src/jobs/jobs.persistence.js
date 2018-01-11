const crypto = require('crypto');
const firebase = require('firebase');
const Logger = require('../utils/logger');

const FIREBASE_URL = require('../config/index').FIREBASE_URL;
const JOBS_DATABASE = require('../config/index').JOBS_DATABASE;
const SlackMessage = require('../slack/SlackMessage');
const SlackActions = require('../slack/slack.actions');

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
  Logger.log('Jobs:persistence:saveOffer', { offer });
  return ref.child(hash(offer.link)).set(offer);
}

/**
 * Get a job offer from the database.
 * @param {*} offer
 */
function getOffer(offer) {
  Logger.log('Jobs:persistence:getOffer', { offer });
  return ref.child(hash(offer.link)).once('value');
}

/**
 * Return all entries from the database
 */
function getAll() {
  return ref.once('value').then(data => data.val()).then(Object.values);
}

/**
 * Add a new vote to an existing offer.
 * 
 * The votes are indexed by userID this way we prevent an user from voting twice.
 */
function vote(url, type, offer, uid) {
  Logger.log('Jobs:persistence:vote', { url, type, offer, uid });
  return ref.child(hash(offer.link))
    .child('votes')
    .child(uid)
    .set(type)
}


module.exports = { saveOffer, getOffer, vote, getAll };
