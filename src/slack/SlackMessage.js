const winston = require('winston');
const SlackAttachments = require('./slack.attachments');

class SlackMessage {
  constructor(offer) {
    winston.info('SlackMessage:constructor', offer);
    // Add title and link to the attachment
    SlackAttachments.VOTE.title = offer.link;
    SlackAttachments.VOTE.title_link = offer.link;

    this.content = {
      text: offer.description,
      attachments: [
        SlackAttachments.VOTE
      ]
    };

    if (offer.votes) {
      let upvotes = 0;
      let downvotes = 0;
      
      for (let uid in offer.votes) {
        offer.votes[uid] === 'upvote' ? upvotes++ : downvotes++;
      }

      this.content.attachments[0].actions[0].text = `${upvotes} 👍`;
      this.content.attachments[0].actions[1].text = `${downvotes} 👎`;
    }
  }
}


module.exports = SlackMessage;
