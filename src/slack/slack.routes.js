/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 *
 * @namespace {slack.routes}
 */

const Logger = require('../utils/logger');
const jobsController = require('../jobs/jobs.controller');
const Offer = require('../jobs/Offer');

const SLACK_ACTIONS = {
  async downvote(payload, uid) {
    Logger.log('Slack:routes:slack_actions:downvote', { payload, uid });
    const offer = new Offer(payload.original_message);
    const reference = await jobsController.vote(payload.response_url, 'downvote', offer, uid);
    return reference;
  },

  async upvote(payload, uid) {
    Logger.log('Slack:routes:slack_actions:upvote', { payload, uid });
    const offer = new Offer(payload.original_message);
    const reference = await jobsController.vote(payload.response_url, 'upvote', offer, uid);
    return reference;
  }
};

/**
 * Request handler for slack actions
 * @param {*} req
 * @param {*} res
 */
async function sendMessage(req, res) {
  Logger.log('Slack:routes:sendMessage', { req, res });
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const uid = `${payload.user.id}/${payload.team.id}`;

    const reference = await SLACK_ACTIONS[action.value](payload, uid);

    res.status(200).send(payload.original_message);
    
  } catch (error) {
    Logger.error('Slack:routes:sendMessage', { error });
    return res.send(500).end();
  }
}

module.exports = { sendMessage };
