/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 * This way we can keep the bussines logic {@link jobs.controller } away from the
 * framework.
 *
 * @namespace {jobs.routes}
 */

const controller = require('./jobs.controller');
const Offer = require('./Offer');

/**
 * Request handler for broadcasting a new job offer.
 * @param {*} req
 * @param {*} res
 */
async function broadcast(req, res) {
    try {
        const offer = _buildOffer(req.body);
        await controller.broadcast(offer);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
}

/**
 * Request handler for slack actions
 * @param {*} req
 * @param {*} res
 */
async function slackResponse(req, res) {
  try {
    const slackData = _buildSlackData(req.body);
    await _runActions(slackData.actions, offer);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

/**
 * Build an offer object from a http request.
 * @param {object} query
 */
function _buildOffer(query) {
    return new Offer(query);
}

/**
 * Build a slack response object from a http request.
 * @param {object} query
 */
function _buildSlackData(query) {
    return query;
}

/**
 * Build a slack response object from a http request.
 * @param {*} actions
 * @param {*} Offer
 */
function _runActions(actions, offer) {
  return actions
    .map(action => controller[action](offer))
    .all();
}

module.exports = { broadcast, slackResponse };
