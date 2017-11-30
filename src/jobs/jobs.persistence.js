const fetch = require('node-fetch');
const firebase = require('firebase');
const Offer = require('./Offer');
const FIREBASE_SERVER = require('../config/index').FIREBASE_SERVER;
const FIREBASE_URL = require('../config/index').FIREBASE_URL;
const JOBS_DATABASE = require('../config/index').JOBS_DATABASE;

const FirebaseApp = firebase.initializeApp({
  databaseURL: FIREBASE_URL
});

const FirebaseDatabase = firebase.database();

/**
 * Store a job offer in our database.
 * @param {*} offer
 */
function saveOffer(offer) {
    const { link, description, createdAt, text } = offer;

    return FirebaseDatabase
      .ref(`${JOBS_DATABASE}/`)
      .push({
        link,
        description,
        createdAt,
        text
      });
}

/**
 * Build the payload required by the firebase server used to store the data.
 * @param {*} offer
 */
function _buildBody(offer) {
    return JSON.stringify(offer);
}

module.exports = { saveOffer };
