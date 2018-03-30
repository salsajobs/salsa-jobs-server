const teamsController = require('../../src/teams/teams.controller');
const teamsPersistence = require('../../src/teams/teams.persistence');
const Errors = require('../../src/constants/errors');

describe('teams.controller', () => {
  let team;
  beforeEach(() => {
    team = JSON.parse(JSON.stringify(require('../mocks').team));
  });

  describe('.save', () => {
    it('should send the team credentials to save them if team_id is present', () => {
      const CREDENTIALS = { team_id: '1234' };

      spyOn(teamsPersistence, 'save').and.returnValue(Promise.resolve());

      return teamsController.save(CREDENTIALS).then(() => {
        expect(teamsPersistence.save).toHaveBeenCalledWith(CREDENTIALS);
      });
    });

    it('should not send team credentials if team_id is not present', () => {
      const CREDENTIALS = {};

      spyOn(teamsPersistence, 'save').and.returnValue(Promise.resolve());

      return teamsController.save(CREDENTIALS)
        .catch((error) => {
          expect(teamsPersistence.save).not.toHaveBeenCalled();
          expect(error).toEqual(new Error(Errors.Teams.MUST_HAVE_TEAM_ID));
        });
    });
  });

  describe('.getIncomingWebhookUrl', () => {
    it('should get the incoming webhook after the team is saved if the url is correct', () => {
      const TEAM_ID = team.team_id;
      const URL = 'https://test.com';

      team.incoming_webhook.url = URL;

      spyOn(teamsPersistence, 'getTeamById').and.returnValue(Promise.resolve(team));

      return teamsController.getIncomingWebhookUrl(TEAM_ID)
        .then((response) => {
          expect(teamsPersistence.getTeamById).toHaveBeenCalled();
          expect(response).toEqual(URL);
        });
    });

    it('should get an error if webhook url is not present', () => {
      const TEAM_ID = team.team_id;

      delete team.incoming_webhook;
      spyOn(teamsPersistence, 'getTeamById').and.returnValue(Promise.resolve(team));

      return teamsController.getIncomingWebhookUrl(TEAM_ID)
        .catch((error) => {
          expect(error).toEqual(new Error(Errors.Teams.WRONG_INCOMING_WEBHOOK_URL));
        });
    });
  });
});
