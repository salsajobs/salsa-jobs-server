const fetch = require('node-fetch');
const FIREBASE_SERVER = require('../config/index').FIREBASE_SERVER;

/**
 * Store a job offer in our database.
 * @param {*} offer
 */
function saveOffer(offer) {
    return fetch(FIREBASE_SERVER, { method: 'POST', body: _buildBody(offer) })
}

/**
 * Build the payload required by the firebase server used to store the data.
 * @param {*} offer
 */
function _buildBody(offer) {
    return JSON.stringify(offer);
}


module.exports = { saveOffer };
