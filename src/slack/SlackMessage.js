const winston = require('winston');

class SlackMessage {
  constructor(job) {
    winston.info('SlackMessage:constructor', job);

    this.content = {
      text: job.description,
      attachments: this._generateAttachments(job)
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

  _generateAttachments(job) {
    return [
      {
        color: '#7761fd',
        text: '¡Vota esta oferta!',
        fallback: 'No puedes votar esta oferta :(',
        callback_id: 'vote',
        attachment_type: 'default',
        actions: [
          {
            name: 'vote',
            text: '0 👍',
            type: 'button',
            value: 'upvote'
          },
          {
            name: 'vote',
            text: '0 👎',
            type: 'button',
            value: 'downvote'
          }
        ],
        title: job.link,
        title_link: job.link,
      },
    ];
  }
}


module.exports = SlackMessage;
