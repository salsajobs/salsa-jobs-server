const rewire = require('rewire');
const slackService = rewire('../../src/slack/slack.service');
const expectedJob = JSON.stringify(require('./expected-job.json'));
const expectedJobList = require('./expected-job-list.json').list;

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
        expect(fetchSpy.calls.argsFor(0)[1].body).toEqual(expectedJob);
      });
    });
  });

  describe('.serializeJob', () => {
    it('should return a message including the votes', () => {
      mockJob.votes = {
        uid0: 'upvote',
        uid1: 'upvote',
        uid2: 'downvote',
      };

      const actual = slackService.serializeJob(mockJob);
      expect(actual.attachments[0].actions[0].text).toEqual('2 👍');
      expect(actual.attachments[0].actions[1].text).toEqual('1 👎');
    });
  });

  describe('.serializeJobList', () => {
    let mockJobList = JSON.parse(JSON.stringify(require('../mocks').jobList));

    it('should return a message listing the jobs', () => {
      const actual = slackService.serializeJobList(mockJobList);
      expect(actual.text).toEqual(expectedJobList);
    });
  });
});
