const fetch = require('node-fetch');
const Logger = require('../utils/logger');
const SlackAttachments = require('./slack.attachments');

class SlackMessage {
  constructor(offer) {
    Logger.log('Class:SlackMessage:constructor', { offer });

    const offerAttachment = Object.assign({}, SlackAttachments.OFFER, {
      author_name: offer.meta.user_name,
      title: offer.meta.text,
      title_link: offer.link
    });

    const voteAttachment = Object.assign({}, SlackAttachments.VOTE);

    this.content = {
      attachments: [
        offerAttachment,
        SlackAttachments.VOTE
      ]
    };
  }

  /**
  * Send the job offer across the slack channels
  * @param {*} offer
  */
  broadcast(responseUrl) {
    Logger.log('Class:SlackMessage:broadcast', { responseUrl });
    const content = JSON.stringify(this.content);
    const options = { method: 'POST', body: content };
    return fetch(responseUrl, options);
  }
}


module.exports = SlackMessage;
