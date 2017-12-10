const SlackActions = {
  UPVOTE: {
    name: 'vote',
    text: '👍',
    type: 'button',
    value: 'upvote'
  },
  DOWNVOTE: {
    name: 'vote',
    text: '👎',
    type: 'button',
    value: 'downvote'
  }
};

module.exports = SlackActions;
