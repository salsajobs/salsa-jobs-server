const SlackActions = require('./slack.actions');

const SlackAttachments = {
  VOTE: {
    color: '#7761fd',
    text: '¡Vota esta oferta!',
    fallback: 'No puedes votar esta oferta :(',
    callback_id: 'vote',
    attachment_type: 'default',
    actions: [
      SlackActions.UPVOTE,
      SlackActions.DOWNVOTE
    ]
  }
};

module.exports = SlackAttachments;
