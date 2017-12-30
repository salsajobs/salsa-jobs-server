const fetch = require('node-fetch');
const Logger = require('../utils/logger');

class SlackResponse {
  constructor(offer, vote) {
    Logger.log('Class:SlackResponse:constructor', { offer, vote });
    this.link = offer.link;
    this.text = offer.text;
    this.vote = vote;
  }


  /**
  * Send the vote response to the user who voted
  * @param {*} responseUrl
  */
  broadcast(responseUrl) {
    Logger.log('Class:SlackResponse:broadcast', { responseUrl });
    const message = `You voted to ${this.text} ${this.link}`;
    const content = JSON.stringify({
      text: `${message}: ${this.vote}`,
      replace_original: false
    });
    const options = { method: 'POST', body: content };
    return fetch(responseUrl, options);
  }
}


module.exports = SlackResponse;
