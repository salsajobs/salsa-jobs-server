const SlackActions = require('./slack.actions');

const SlackAttachments = {
  OFFER: {
    pretext: 'Job announcement!',
    color: '#b5b0d4',
  },

  VOTE: {
    color: '#7761fd',
    text: 'Vote this offer!',
    fallback: 'You are unable to vote :(',
    callback_id: 'vote',
    attachment_type: 'default',
    actions: [
      SlackActions.UPVOTE,
      SlackActions.DOWNVOTE
    ]
  }
};

module.exports = SlackAttachments;
