const SlackActions = require('./slack.actions');

const SlackAttachments = {
  OFFER: {
    color: '#b5b0d4',
    image_url: '',
    thumb_url: '',
    footer: 'appname'
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
