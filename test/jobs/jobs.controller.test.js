const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');
const SlackActions = require('../../src/slack/slack.actions');

const { offer, existingOfferSnapshot, noOfferSnapshot } = require('../mocks');

describe('jobs.controller', () => {
    describe('postJob', () => {
      it('should return a resolved promise when persistence succees', () => {
          jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());

          return controller.postJob(offer);
      });

      it('should return a rejected promise when persistence fails', done => {
          jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.reject());

          return controller.postJob(offer).catch(done);
      });
    });

    describe('getJob', () => {
      it('should return a resolved promise when persistence succees', () => {
          jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.resolve());

          return controller.getJob(offer);
      });

      it('should return a rejected promise when persistence fails', done => {
          jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.reject());

          return controller.getJob(offer).catch(done);
      });
    });

    describe('upvote', () => {
      it('should return a resolved promise when persistence succees', () => {
          jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.resolve());

          return controller.vote(SlackActions.UPVOTE.value, offer);
      });

      it('should return a rejected promise when persistence fails', done => {
          jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.reject());

          return controller.vote(SlackActions.UPVOTE.value, offer).catch(done);
      });
    });

    describe('downvote', () => {
      it('should return a resolved promise when persistence succees', () => {
          jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.resolve());

          return controller.vote(SlackActions.DOWNVOTE.value, offer);
      });

      it('should return a rejected promise when persistence fails', done => {
          jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.reject());

          return controller.vote(SlackActions.DOWNVOTE.value, offer).catch(done);
      });
    });

    describe('broadcast', () => {
      it('should return a resolved promise if the offer already exists', () => {
          jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.resolve(existingOfferSnapshot));
          jest.spyOn(controller, 'broadcastSlack').mockImplementation(() => Promise.resolve());
          fetch.mockResponse('{}');

          return controller.broadcast('responseUrl', offer);
      });

      it('should post an offer and return a resolved promise if the offer does not exist and broadcast succeeds', () => {
          jest.spyOn(persistence, 'getOffer').mockImplementation(() => Promise.resolve(noOfferSnapshot));
          jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());
          jest.spyOn(controller, 'broadcastSlack').mockImplementation(() => Promise.resolve());
          fetch.mockResponse('{}');

          return controller.broadcast('responseUrl', offer);
      });

      it('should return a rejected promise when persistence fails and broadcast fails', done => {
          jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.reject());
          jest.spyOn(controller, 'broadcastSlack').mockImplementation(() => Promise.reject());

          return controller.postJob(offer).catch(done);
      });
    });
});
