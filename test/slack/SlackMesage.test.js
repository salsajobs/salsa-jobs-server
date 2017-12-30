const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const SlackMessage = require('../../src/slack/SlackMessage');
const {offer} = require('../mocks');

describe('slack.SlackMessage', () => {
  const slackMessage = new SlackMessage(offer);
  describe('Constructor', () => {
    it('should create a new object [01]', () => {
      expect(slackMessage.content).toBeDefined();
      expect(slackMessage.content.attachments.length).toEqual(2);
    });
  });

  describe('broadcast', () => {
    it('should broadcast a slack message to vote an offer', done => {
      const slackResponseMock = {};
      fetch.mockResponse(JSON.stringify(slackResponseMock));

      slackMessage.broadcast()
        .then(response => response.json())
        .then((data) => {
          expect(data).toEqual(slackResponseMock);
          done();
      });
    });
  });
});
