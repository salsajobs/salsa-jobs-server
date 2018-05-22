const rewire = require('rewire');
const slackService = rewire('../../src/slack/slack.service');
const expectedBody = JSON.stringify(require('./expected-body.json')); // Test the message format in https://api.slack.com/docs/messages/builder


describe('slack.service', () => {
  let mockJob;
  beforeEach(() => {
    mockJob = JSON.parse(JSON.stringify(require('../mocks').job));
  });
  describe('.broadcast', () => {
    it('should send a job job through a slack channel', () => {
      const fetchSpy = jasmine.createSpy('fetch');
      slackService.__set__('fetch', fetchSpy);
      expect(fetchSpy).not.toHaveBeenCalled();
      return slackService.broadcast(mockJob, 'https://www.slack-url.com').then(() => {
        expect(fetchSpy.calls.argsFor(0)[0]).toEqual('https://www.slack-url.com');
        expect(fetchSpy.calls.argsFor(0)[1].method).toEqual('POST');
        expect(fetchSpy.calls.argsFor(0)[1].body).toEqual(expectedBody);
        
      });
    });
  });

  describe('.serialize', () => {
    it('should return a message including the votes', () => {
      mockJob.votes = {
        uid0: 'upvote',
        uid1: 'upvote',
        uid2: 'downvote',
      };

      const actual = slackService.serialize(mockJob);
      expect(actual.attachments[0].actions[0].text).toEqual('2 👍');
      expect(actual.attachments[0].actions[1].text).toEqual('1 👎');
    });
  });
});