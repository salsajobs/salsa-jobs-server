const winston = require('winston');
const controller = require('./jobs.controller');
const slackService = require('../slack/slack.service');
const teamsController = require('../teams/teams.controller');
const jobsUtils = require('./jobs.utils');
const jobsService = require('./jobs.service');
const Responses = require('../constants/responses');

/**
 * Handle /job post command. The following commands are availiable.
 *
 * /job help: Returns a message about how to use the bot
 * /job: (empty message), returns also a message about how to use the bot
 * /job list: Returns a list of jobs
 * /job <url>: Create a new job in the database pointing to the url
 */
async function post(req, res) {
  winston.info('jobs-router:post', { payload: req.body });

  const slackMessage = req.body.text;
  const slackCommand = jobsUtils.getCommand(slackMessage);

  return _post(slackCommand, req, res);
}

/**
 * Returns the post action depending on the given command
 */

function _post(slackCommand, req, res) {
  const commandFunctions = {
    HELP:          _help,
    LIST:          _list,
    EMPTY:         _empty,
    CREATE_JOB:    _createJob,
    WRONG_COMMAND: _help
  };

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
      .status(Responses.Jobs.Vote.Success.CODE)
      .send(updatedMessage);
  } catch (error) {
    winston.error('jobs-router:vote', { payload: req.body.payload, error });

    return res
      .status(Responses.Jobs.Vote.Error.CODE)
      .send(Responses.Jobs.Vote.Error.MESSAGE);
  }
}

/**
 * Get all jobs from the databse
 */
async function list(req, res) {
  winston.info('jobs-router:list', { payload: req.body });

  try {
    const list = await controller.getAll();

    res
      .status(Responses.Jobs.List.Success.CODE)
      .json(list);
  } catch (error) {
    winston.error('jobs-router:list', { payload: req.body, error });
    return res
      .status(Responses.Jobs.List.Error.CODE)
      .send(Responses.Jobs.List.Error.MESSAGE);
  }
}


/**
 * Create a new job job.
 * If the job already exists in the database, just broadcast to the channel
 */
async function _createJob(req, res) {
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
async function _help(req, res) {
  return res
    .status(Responses.Jobs.Post.Help.CODE)
    .send(Responses.Jobs.Post.Help.MESSAGE);
}

/**
 * Sends the list of jobs
 */
async function _list(req, res) {
  try {
    const list = await controller.getAll();
    const jobListMessage = slackService.serializeJobList(list);

    return res
      .status(Responses.Jobs.Post.SuccessList.CODE)
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
async function _empty(req, res) {
  return res
    .status(Responses.Jobs.Post.Empty.CODE)
    .send(Responses.Jobs.Post.Empty.MESSAGE);
}

module.exports = { post, vote, list };
