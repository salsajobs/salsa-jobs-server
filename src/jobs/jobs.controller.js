const winston = require('winston');
const persistence = require('./jobs.persistence');

/**
 * Add a new job into the system if it does not exists.
 *
 * @param {object} job
 */
async function postJob(job) {
  winston.info('jobs-controller:postJob', job);
  const existingJob = await persistence.getJob(job);

  return existingJob
    ? { job: existingJob, existing: true }
    : { job: persistence.saveJob(job), existing: false };
}

/**
 * Add a new vote to a job.
 *
 * @param {string} jobId
 * @param {string} uid
 * @param {string} type
 */
async function vote(jobId, uid, type) {
  winston.info('jobs-controller:postJob', { jobId, uid, type });
  await persistence.vote(jobId, uid, type);
  return persistence.getJobById(jobId);
}

/**
 * List all jobs in the database.
 */
async function getAll() {
  winston.info('jobs-controller:getAll');
  const jobs = await persistence.getAll();
  return jobs.map(_createPublicJob);
}

/**
 * Transform a job from the database to a public object availiable in the API.
 */
function _createPublicJob(job) {
  if (!job.votes) job.votes = [];

  const vote = {
    createdAt: job.createdAt,
    description: job.description,
    link: job.link,
    meta: job.meta,
    votes: {
      upvotes: _getVotes(job.votes, 'upvote'),
      downvotes: _getVotes(job.votes, 'downvote')
    }
  };

  return vote;
}

function _getVotes(votes, voteType) {
  return (_filterByVoteType(Object.values(votes), voteType)).length || 0;
}

function _filterByVoteType(votes, type) {
  return votes.filter(vote => vote === type);
}

module.exports = { vote, postJob, getAll };
