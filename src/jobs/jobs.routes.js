/**
 *
 * This file contains express routes in form of functions (req, res) => any.
 * This way we can keep the bussines logic {@link jobs.controller } away from the 
 * framework.
 *
 * @namespace {jobs.routes}
 */

const controller = require('./jobs.controller');

/**
 * Request handler for posting a new job offer.
 * @param {*} req 
 * @param {*} res 
 */
function postJob(req, res) {
    const offer = _buildOffer(req);
    controller.postJob(offer)
        .then(() => {
            res.sendStatus(201);
        })
        .catch(() => {
            console.log(err);
            res.send(500);
        });
}

/**
 * Build an offer object from a http request.
 * @param {*} req 
 */
function _buildOffer(req) {
    return {
        text: req.body.text
    }
}


module.exports = { postJob };