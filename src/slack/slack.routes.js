/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 *
 * @namespace {slack.routes}
 */

const Logger = require('../utils/logger');
const fetch = require('node-fetch');
const SlackActions = require('./slack.actions');
const jobsController = require('../jobs/jobs.controller');
const Offer = require('../jobs/Offer');

/**
 * Request handler for slack actions
 * @param {*} req
 * @param {*} res
 */
async function sendMessage(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const uid = `${payload.team.id}-${payload.user.id}`;
    const responseUrl = payload.response_url;
    const offer = new Offer(payload.original_message);

    Logger.log('Slack:routes:sendMessage', { responseUrl, action, uid });

    // TODO: Update message with vote count from reference?
    jobsController
      .vote(responseUrl, action.value, offer, uid)
      .then(() => {
        const vote = SlackActions[action.value.toUpperCase()].text;

        res.status(200).send(payload.original_message);
        return jobsController.broadcastSlackVoteResponse(responseUrl, offer, vote);
    });

  } catch (error) {
    Logger.error('Slack:routes:sendMessage', { error });
    return res.send(500).end();
  }
}

module.exports = { sendMessage };
