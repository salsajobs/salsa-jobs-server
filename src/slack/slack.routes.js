/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 *
 * @namespace {slack.routes}
 */

const jobsController = require('../jobs/jobs.controller');
const Offer = require('../jobs/Offer');

const SLACK_ACTIONS = {
  downvote(payload, uid) {
    const offer = new Offer(payload.original_message);
    return jobsController.vote(payload.response_url, 'downvote', offer, uid);
  },

  upvote(payload, uid) {
    const offer = new Offer(payload.original_message);
    return jobsController.vote(payload.response_url, 'upvote', offer, uid);
  }
};

/**
 * Request handler for slack actions
 * @param {*} req
 * @param {*} res
 */
async function sendMessage(req, res) {

  try {
    const payload = JSON.parse(req.body.payload);
    const slackActions = _getSlackActions(payload);

    console.log('slackActions', slackActions);

    if (slackActions.length) {
      await Promise
        .all(slackActions.map(action => {
          const uid = `${payload.user.id}/${payload.team.id}`;
          return SLACK_ACTIONS[action.value](payload, uid);
        }))
        .then(res.sendStatus(200))
        .catch(res.sendStatus(500));
    } else {
      res.sendStatus(403);
    }

  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

/**
 * Get the actions from the payload
 * @param {*} actions
 * @param {*} Offer
 */
function _getSlackActions(payload) {
  return payload.actions.filter(action => action.value === 'upvote' || action.value === 'downvote');
}

module.exports = { sendMessage };
