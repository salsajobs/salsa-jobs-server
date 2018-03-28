const teamsController = require('../../src/teams/teams.controller');
const teamsPersistence = require('../../src/teams/teams.persistence');
const Errors = require('../../src/constants/errors');
const { team } = require('../mocks');

describe('teams.controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.save', () => {
    it('should send the team credentials to save them if team_id is present', (done) => {
      const CREDENTIALS = {
        team_id: '1234'
      };

      jest.spyOn(teamsPersistence, 'save').mockImplementation(() => Promise.resolve());

      teamsController.save(CREDENTIALS)
        .then(() => {
          expect(teamsPersistence.save).toHaveBeenCalledWith(CREDENTIALS);
          done();
        });
    });

    it('should not send team credentials if team_id is not present', (done) => {
      const CREDENTIALS = {};

      jest.spyOn(teamsPersistence, 'save').mockImplementation(() => Promise.resolve());

      teamsController.save(CREDENTIALS)
        .catch((error) => {
          expect(teamsPersistence.save).not.toHaveBeenCalled();
          expect(error).toEqual(new Error(Errors.Teams.MUST_HAVE_TEAM_ID));
          done();
        });
    });
  });

  describe('.getIncomingWebhookUrl', () => {
    it('should get the incoming webhook after the team is saved if the url is correct', (done) => {
      const TEAM_ID = team.team_id;
      const URL = 'https://test.com';

      team.incoming_webhook.url = URL;

      jest.spyOn(teamsPersistence, 'getTeamById').mockImplementation(() => Promise.resolve(team));

      teamsController.getIncomingWebhookUrl(TEAM_ID)
        .then((response) => {
          expect(teamsPersistence.getTeamById).toHaveBeenCalled();
          expect(response).toEqual(URL);
          done();
        });
    });

    it('should get an error if webhook url is not present', (done) => {
      const TEAM_ID = team.team_id;

      delete team.incoming_webhook;
      jest.spyOn(teamsPersistence, 'getTeamById').mockImplementation(() => Promise.resolve(team));

      teamsController.getIncomingWebhookUrl(TEAM_ID)
        .catch((error) => {
          expect(error).toEqual(new Error(Errors.Teams.WRONG_INCOMING_WEBHOOK_URL));
          done();
        });
    });
  });
});
