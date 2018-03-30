const oauthController = require('../../src/oauth/oauth.controller');
const teamsController = require('../../src/teams/teams.controller');
const config = require('../../src/config/index');

describe('oauth.controller', () => {
  describe('.getAuthorizedURL', () => {
    it('should return the slack oauth url for a given code', () => {
      const CODE = '1234';
      const url = oauthController.getAuthorizedURL(CODE);

      expect(url).toContain(config.OAUTH_URL);
      expect(url).toContain(CODE);
    });
  });

  describe('.saveCredentials', () => {
    it('should save slack team credentials', () => {
      spyOn(teamsController, 'save').and.returnValue(Promise.resolve(true));

      const credentials = {
        teamId: '1234'
      };

      return oauthController.saveCredentials(credentials).then(() => {
        expect(teamsController.save).toHaveBeenCalledWith(credentials);
      });
    });
  });
});
