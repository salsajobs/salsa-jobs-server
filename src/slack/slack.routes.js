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
  /**
   * Return a promise resolved with a firebase reference to the offer.
   */
  downvote(payload, uid) {
    Logger.log('Slack:routes:slack_actions:downvote', { payload, uid });
    const offer = new Offer(payload.original_message);
    return jobsController.vote(payload.response_url, 'downvote', offer, uid);
  },

  /**
   * Return a promise resolved with a firebase reference to the offer.
   */
  upvote(payload, uid) {
    Logger.log('Slack:routes:slack_actions:upvote', { payload, uid });
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
  Logger.log('Slack:routes:sendMessage', { req, res });
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const uid = `${payload.team.id}-${payload.user.id}`;

    const reference = await SLACK_ACTIONS[action.value](payload, uid);
    // TODO: Update message with vote count from reference?
    res.status(200).send(payload.original_message);
    
  } catch (error) {
    Logger.error('Slack:routes:sendMessage', { error });
    return res.send(500).end();
  }
}

module.exports = { sendMessage };
