const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');
const slackbot = require('../../src/jobs/jobs.slackbot');

describe('jobs.controller', () => {
    const offer = { text: 'https://boards.greenhouse.io/cartodb/jobs/939056' };
    it('should return a resolved promise when persistence and broadcast works', () => {
        jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());
        jest.spyOn(slackbot, 'broadcast').mockImplementation(() => Promise.resolve('broadcast'));
        
        return controller.postJob(offer);
    });

    it('should return a rejected promise when persistence fails and broadcast works', done => {
        jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.reject());
        jest.spyOn(slackbot, 'broadcast').mockImplementation(() => Promise.resolve());

        return controller.postJob(offer).catch(done);
    });

    it('should return a rejected promise when persistence works and broadcast fails', done => {
        jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.resolve());
        jest.spyOn(slackbot, 'broadcast').mockImplementation(() => Promise.reject());

        return controller.postJob(offer).catch(done);
    });

    it('should return a rejected promise when persistence fails and broadcast fails', done => {
        jest.spyOn(persistence, 'saveOffer').mockImplementation(() => Promise.reject());
        jest.spyOn(slackbot, 'broadcast').mockImplementation(() => Promise.reject());

        return controller.postJob(offer).catch(done);
    });
})