const winston = require('winston');

class JobListMessage {
  constructor(list) {
    winston.info('JobListMessage:constructor', list);

    this.content = {
      text: this._generateJobList(list),
      mrkdwn: true
    };
  }

  _generateJobList(list) {
    let jobListText = [];

    list.forEach((job) => {
      let upvotes = job.votes.upvotes ? job.votes.upvotes : 0;
      let downvotes = job.votes.downvotes ? job.votes.downvotes : 0;
      jobListText.push(`➡️  ${job.link} | ${upvotes} 👍 ${downvotes} 👎`);
    });

    return jobListText.join('\n');
  }
}


module.exports = JobListMessage;
