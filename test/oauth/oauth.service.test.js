const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);
// Mock fetch before load service
const oauthService = require('../../src/oauth/oauth.service.js');

describe('oauth.service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.authorize', () => {
    it('should fetch the given authorization url', (done) => {
      const URL = 'http://test.com';
      oauthService.authorize(URL)
        .then(() => {
          expect(fetch.mock.calls[0][0]).toEqual(URL);
          expect(fetch.mock.calls[0][1].method).toEqual('GET');
          done();
        });
    });
  });
});
