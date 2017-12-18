const crypto = require('crypto');
const firebase = require('firebase');
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
 * Add a new vote to an existing offer
 * @param {*} offer
 */
function vote(url, type, offer, uid) {
  const slackMessage = new SlackMessage(offer);

  console.log('persistence:vote:type:', type);
  console.log('persistence:vote:offer:', offer);
  console.log('persistence:vote:uid:', uid);

  return ref.child(hash(offer.link))
    .child('votes')
    .child(type)
    .push(uid)
    .then(() => {
      const message = 'You voted';
      return SlackMessage.answer(url, message, type);
    });
}


module.exports = { saveOffer, getOffer, vote };
