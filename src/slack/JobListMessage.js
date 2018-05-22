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
      jobListText.push(`- ${job.link}`);
    });

    return jobListText.join('\n');
  }
}


module.exports = JobListMessage;
