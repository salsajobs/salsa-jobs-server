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
  downvote(payload, uid) {
    Logger.log('Slack:routes:slack_actions:downvote', { payload, uid });
    const offer = new Offer(payload.original_message);
    return jobsController.vote(payload.response_url, 'downvote', offer, uid);
  },

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
    const uid = `${payload.user.id}/${payload.team.id}`;

    res.status(200).send({
      "text": "Would you like to play a game?",
      "attachments": [
        {
          "text": "Choose a game to play",
          "fallback": "You are unable to choose a game",
          "callback_id": "wopr_game",
          "color": "#3AA3E3",
          "attachment_type": "default",
          "actions": [
            {
              "name": "game",
              "text": "Chess",
              "type": "button",
              "value": "chess"
            },
            {
              "name": "game",
              "text": "Falken's Maze",
              "type": "button",
              "value": "maze"
            },
            {
              "name": "game",
              "text": "Thermonuclear War",
              "style": "danger",
              "type": "button",
              "value": "war",
              "confirm": {
                "title": "Are you sure?",
                "text": "Wouldn't you prefer a good game of chess?",
                "ok_text": "Yes",
                "dismiss_text": "No"
              }
            }
          ]
        }
      ]
    });
    return SLACK_ACTIONS[action.value](payload, uid);
  } catch (error) {
    Logger.error('Slack:routes:sendMessage', { error });
    return res.send(500).end();
  }
}

module.exports = { sendMessage };
