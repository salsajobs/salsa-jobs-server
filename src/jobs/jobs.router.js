const winston = require('winston');
const controller = require('./jobs.controller');
const slackService = require('../slack/slack.service');
const teamsController = require('../teams/teams.controller');
const jobService = require('./jobs.service');
const Responses = require('../constants/responses');

/**
 * Create a new job job.
 * If the job already exists in the database, just broadcast to the channel
 */
async function post(req, res) {
  winston.info('jobs-router:post', { payload: req.body });

  try {
    const newJob = jobService.createJob(req.body);
    const postedJob = await controller.postJob(newJob);
    const incomingWebhookURL = await teamsController.getIncomingWebhookUrl(postedJob.job.meta.team_id);
    winston.info('jobs-router:post_incomingWebhookURL', { incomingWebhookURL });
    await slackService.broadcast(postedJob.job, incomingWebhookURL);

    return postedJob.existing
      ? res
        .status(Responses.Jobs.Post.SuccessExisting.CODE)
        .send(Responses.Jobs.Post.SuccessExisting.MESSAGE)
      : res
        .status(Responses.Jobs.Post.SuccessNew.CODE)
        .send(Responses.Jobs.Post.SuccessNew.MESSAGE);

  } catch (error) {
    winston.error('jobs-router:post', { payload: req.body, error });
    return res
      .status(Responses.Jobs.Post.Error.CODE)
      .send(Responses.Jobs.Post.Error.MESSAGE);
  }
}

/**
 * Vote an existing job job.
 */
async function vote(req, res) {
  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const type = action.value.toLowerCase();
    const uid = `${payload.team.id}-${payload.user.id}`;
    // TODO: can we get the id easier?
    const jobLink = jobService.getLink(payload.original_message.attachments[0].title_link);
    const jobId = jobService.hash(jobLink);
    const job = await controller.vote(jobId, uid, type);
    const updatedMessage = slackService.serialize(job);

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
