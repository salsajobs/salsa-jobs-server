const winston = require('winston');

class JobListMessage {
  constructor(list) {
    winston.info('JobListMessage:constructor', list);

    this.content = {
      text: this._getJobList(list),
      mrkdwn: true
    };
  }

  _getJobList(list) {
    return list
      .map(this._getJobListItem)
      .join('\n');
  }

  _getJobListItem(job) {
    let upvotes = job.votes.upvotes ? job.votes.upvotes : 0;
    let downvotes = job.votes.downvotes ? job.votes.downvotes : 0;

    return `➡️  ${job.link} | ${upvotes} 👍 ${downvotes} 👎`;
  }
}


module.exports = JobListMessage;
