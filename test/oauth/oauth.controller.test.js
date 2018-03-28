const oauthController = require('../../src/oauth/oauth.controller');
const teamsController = require('../../src/teams/teams.controller');
const config = require('../../src/config/index');

describe('oauth.controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.getAuthorizedURL', () => {
    it('should return the slack oauth url for a given code', () => {
      const CODE = '1234';
      const url = oauthController.getAuthorizedURL(CODE);

      expect(url).toContain(config.OAUTH_ACCESS);
      expect(url).toContain(CODE);
    });
  });

  describe('.saveCredentials', () => {
    it('should save slack team credentials', (done) => {
      jest.spyOn(teamsController, 'save').mockImplementation(() => Promise.resolve(true));

      const credentials = {
        teamId: '1234'
      };

      oauthController.saveCredentials(credentials)
        .then(() => {
          expect(teamsController.save).toBeCalledWith(credentials);
          done();
        });
    });
  });
});
