const rewire = require('rewire');
const oauthService = rewire('../../src/oauth/oauth.service.js');

describe('oauth.service', () => {
  describe('.authorize', () => {
    it('should fetch the given authorization url', () => {
      const fetchSpy = jasmine.createSpy('fetch');
      oauthService.__set__('fetch', fetchSpy);

      const URL = 'http://test.com';
      return oauthService.authorize(URL).then(() => {
        expect(fetchSpy).toHaveBeenCalledWith(URL, { method: 'GET' });
      });
    });
  });
});
