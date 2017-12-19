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
    const action = payload.actions[0];
    const uid = `${payload.user.id}/${payload.team.id}`;

    res.sendStatus(200);
    return SLACK_ACTIONS[action.value](payload, uid);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

module.exports = { sendMessage };
