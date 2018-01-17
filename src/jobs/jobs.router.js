const winston = require('winston');
const config = require('../config');
const controller = require('./jobs.controller');
const slackService = require('../slack/slack.service');
const jobService = require('./jobs.service');

/**
 * Create a new job offer.
 * If the job already exists in the database, just broadcast to the channel
 */
async function post(req, res) {
  try {
    const offer = jobService.createJob(req.body);
    await controller.postJob(offer);
    await slackService.broadcast(offer, config.SLACK_BOT_URL);
    res.status(201).send('Offer created');
  } catch (error) {
    winston.error('jobs-router:post', { payload: req.body, error });
    return res.sendStatus(500);
  }
}

/**
 * Vote an existing job offer.
 */
async function vote(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const type = action.value.toLowerCase();
    const uid = `${payload.team.id}-${payload.user.id}`;
    // TODO: can we get the id easier?
    const offerLink = jobService.getLink(payload.original_message.attachments[0].title_link);
    const offerId = jobService.hash(offerLink);
    const offer = await controller.vote(offerId, uid, type);
    const updatedMessage = slackService.serialize(offer);
    res.status(200).send(updatedMessage);
  } catch (error) {
    winston.error('jobs-router:vote', { payload: req.body.payload, error });
    return res.sendStatus(500);
  }
}

/**
 * Get all jobs from the databse
 */
async function list(req, res) {
  try {
    const list = await controller.getAll();
    res.json(list);
  } catch (err) {
    res.sendStatus(500);
  }
}


module.exports = { post, vote, list };
