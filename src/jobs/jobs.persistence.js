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
 * Store a job offer in our database.
 * @param {*} offer
 */
function saveOffer(offer) {
  return ref.child(hash(offer.link)).set(offer);
}

module.exports = { saveOffer };
