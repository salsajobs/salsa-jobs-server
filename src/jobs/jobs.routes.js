/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 * This way we can keep the bussines logic {@link jobs.controller } away from the
 * framework.
 *
 * @namespace {jobs.routes}
 */

const Logger = require('../utils/logger');
const config = require('../config');
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
        Logger.log('Jobs:routes:broadcast', { offer });

        await controller.broadcast(config.SLACK_BOT_URL, offer);
        res.status(201).send('Offer created');
    } catch (error) {
        Logger.error('Jobs:routes:broadcast', { error });
        return res.sendStatus(500);
    }
}

/**
 * Get all jobs from the databse
 */
async function list(req, res) {
    Logger.log('Jobs:routes:list');
    try {
        const list = await controller.getAll();
        res.json(list);
    } catch (err) {
        res.sendStatus(500);
    }

}

/**
 * Build an offer object from a http request.
 * @param {object} query
 */
function _buildOffer(query) {
    Logger.log('Jobs:routes:_buildOffer', { query });
    return new Offer(query);
}

module.exports = { broadcast, list };
