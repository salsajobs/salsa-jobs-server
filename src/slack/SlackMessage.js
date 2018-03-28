const winston = require('winston');
const SlackAttachments = require('./slack.attachments');

class SlackMessage {
  constructor(job) {
    winston.info('SlackMessage:constructor', job);
    // Add title and link to the attachment
    SlackAttachments.VOTE.title = job.link;
    SlackAttachments.VOTE.title_link = job.link;

    this.content = {
      text: job.description,
      attachments: [
        Object.assign({}, SlackAttachments.VOTE),
      ]
    };

    if (job.votes) {
      let upvotes = 0;
      let downvotes = 0;

      for (let uid in job.votes) {
        job.votes[uid] === 'upvote' ? upvotes++ : downvotes++;
      }

      this.content.attachments[0].actions[0].text = `${upvotes} 👍`;
      this.content.attachments[0].actions[1].text = `${downvotes} 👎`;
    }
  }
}


module.exports = SlackMessage;
