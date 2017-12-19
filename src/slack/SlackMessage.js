const fetch = require('node-fetch');
const config = require('../config');
const SlackAttachments = require('./slack.attachments');
const SlackActions = require('./slack.actions');

class SlackMessage {
  constructor(offer) {
    const offerAttachment = Object.assign({}, SlackAttachments.OFFER, {
      author_name: offer.meta.user_name,
      title: offer.meta.text,
      title_link: offer.link
    });

    const voteAttachment = Object.assign({}, SlackAttachments.VOTE);

    this.content = {
      text: 'Job announcement!',
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
  broadcast() {
    const content = JSON.stringify(this.content);
    const options = { method: 'POST', body: content };
    return fetch(config.SLACK_BOT_URL, options);
  }

  /**
  * Answer to a request url
  * @param {*} requestUrl
  * @param {*} message
  */
  answer(responseUrl, message, type) {
    const text = SlackActions[type.toUpperCase()].text;
    const content = JSON.stringify({
      text: `${message}: ${text}`,
      replace_original: false
    });
    const options = { method: 'POST', body: content };
    return fetch(responseUrl, options);
  }
};


module.exports = SlackMessage;
