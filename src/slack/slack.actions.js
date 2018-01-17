const SlackActions = {
  UPVOTE: {
    name: 'vote',
    text: '0 👍',
    type: 'button',
    value: 'upvote'
  },
  DOWNVOTE: {
    name: 'vote',
    text: '0 👎',
    type: 'button',
    value: 'downvote'
  }
};

module.exports = SlackActions;
