const winston = require('winston');
const controller = require('./jobs.controller');
const slackService = require('../slack/slack.service');
const teamsController = require('../teams/teams.controller');
const jobsUtils = require('./jobs.utils');
const jobsService = require('./jobs.service');
const Responses = require('../constants/responses');

/**
 * Handle /job post command
 */
async function post(req, res) {
  winston.info('jobs-router:post', { payload: req.body });

  const slackMessage = req.body.text;
  const slackCommand = jobsUtils.getCommand(slackMessage);

  return commandFunctions[slackCommand](req, res);
}

/**
 * Vote an existing job.
 */
async function vote(req, res) {
  winston.info('jobs-router:vote', { payload: req.body.payload });

  try {
    const payload = JSON.parse(req.body.payload);
    const action = payload.actions[0];
    const type = action.value.toLowerCase();
    const uid = `${payload.team.id}-${payload.user.id}`;
    const jobLink = jobsUtils.getLink(payload.original_message.attachments[0].title_link);
    const jobId = jobsService.hash(jobLink);
    const job = await controller.vote(jobId, uid, type);
    const updatedMessage = slackService.serializeJob(job);

    res
      .status(200)
      .send(updatedMessage);
  } catch (error) {
    winston.error('jobs-router:vote', { payload: req.body.payload, error });

    return res
      .status(Responses.Jobs.Post.ErrorVote.CODE)
      .send(Responses.Jobs.Post.ErrorVote.MESSAGE);
  }
}

/**
 * Get all jobs from the databse
 */
async function list(req, res) {
  winston.info('jobs-router:list', { payload: req.body });

  try {
    const list = await controller.getAll();
    res.json(list);
  } catch (error) {
    winston.error('jobs-router:list', { payload: req.body, error });
    return res
      .status(Responses.Jobs.Post.ErrorList.CODE)
      .send(Responses.Jobs.Post.ErrorList.MESSAGE);
  }
}

const commandFunctions = {
  help:    _sendHelp,
  joblist: _sendJobList,
  empty:   _sendEmpty,
  createjob:  _sendCreateJob,
  wrongcommand: _sendHelp
};


/**
 * Create a new job job.
 * If the job already exists in the database, just broadcast to the channel
 */
async function _sendCreateJob(req, res) {
  winston.info('jobs-router:_sendJob', { payload: req.body });

  try {
    const job = jobsService.createJob(req.body);
    const postedJob = await controller.postJob(job);
    winston.info('jobs-router:postedJob', postedJob);
    const incomingWebhookURL = await teamsController.getIncomingWebhookUrl(job.meta.team_id);
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
      .status(Responses.Jobs.Post.ErrorCreate.CODE)
      .send(Responses.Jobs.Post.ErrorCreate.MESSAGE);
  }
}

/**
 * Sends the command instructions
 */
async function _sendHelp(req, res) {
  return res
    .status(Responses.Jobs.Post.Help.CODE)
    .send(Responses.Jobs.Post.Help.MESSAGE);
}

/**
 * Sends the list of jobs
 */
async function _sendJobList(req, res) {
  try {
    const list = await controller.getAll();
    const jobListMessage = slackService.serializeJobList(list);

    return res
      .status(Responses.Jobs.SuccessList.CODE)
      .send(jobListMessage);

  } catch (error) {
    return res
      .status(Responses.Jobs.Post.Help.CODE)
      .send(Responses.Jobs.Post.Help.MESSAGE);
  }
}

/**
 * Sends information if the user sent an empty message
 */
async function _sendEmpty(req, res) {
  return res
    .status(Responses.Jobs.Post.Empty.CODE)
    .send(Responses.Jobs.Post.Empty.MESSAGE);
}

module.exports = { post, vote, list };
