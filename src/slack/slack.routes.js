/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 *
 * @namespace {slack.routes}
 */

const jobsController = require('../jobs/jobs.controller');
const Offer = require('../jobs/Offer');

const slackActions = {
  async downvote(type, payload) {
    const offer = new Offer(payload.original_message);
    await jobsController.vote(type, offer);
  },

  async upvote(type, payload) {
    const offer = new Offer(payload.original_message);
    await jobsController.vote(type, offer);
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
    const slackActions = _runSlackActions(payload);

    if (slackActions.length) {
      await slackActions.all();
      res.sendStatus(201);
    } else {
      res.sendStatus(403);
    }

  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

/**
 * Build a slack response object from a http request.
 * @param {*} actions
 * @param {*} Offer
 */
async function _runSlackActions(payload) {
  return await payload.actions
    .filter(action => !!slackActions[action.name])
    .map(action => slackActions[action.name](action.name, payload));
}

module.exports = { sendMessage };
