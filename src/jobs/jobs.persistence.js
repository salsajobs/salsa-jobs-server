const winston = require('winston');
const { ref } = require('../config/firebase');

/**
 * Store a job job in the database.
 * @param {*} job
 */
function saveJob(job) {
  winston.info('jobs-persistence:saveJob', job);
  return ref
    .child('jobs')
    .child(job.id)
    .set(job);
}

/**
 * Get a job job from the database.
 * @param {*} job
 */
function getJob(job) {
  winston.info('jobs-persistence:getJob', job);
  return getJobById(job.id);
}

/**
 * Get a job job from the database.
 * @param {string} id
 */
function getJobById(id) {
  winston.info('jobs-persistence:getJobById', id);
  return ref
    .child('jobs')
    .child(id)
    .once('value')
    .then(snapshot => snapshot.val());
}


/**
 * Add a new vote to an existing job.
 *
 * The votes are indexed by userID. This way we prevent an user from voting twice.
 * @param {string} jobId
 * @param {string} uid
 * @param {string} type
 */
function vote(jobId, uid, type) {
  winston.info('jobs-persistence:vote', { jobId, uid, type });
  return ref
    .child('jobs')
    .child(jobId)
    .child('votes')
    .child(uid)
    .set(type);
}

/**
 * Return all entries from the database
 */
function getAll() {
  return ref
    .child('jobs')
    .once('value')
    .then(data => data.val())
    .then(Object.values);
}


module.exports = { saveJob, getJob, vote, getJobById, getAll };
