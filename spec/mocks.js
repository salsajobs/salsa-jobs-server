const jobService = require('../src/jobs/jobs.service');

const _createFakeJob = function (id) {
  return jobService.createJob({
    channel_id: `channel_id_mock-${id}`,
    user_id: `user_id_mock-${id}`,
    text: `https://example.com/foo/bar/${id} fake_description-${id}`
  });
};

const job = _createFakeJob('1');

const jobList = [
  _createFakeJob('1'),
  _createFakeJob('2'),
  _createFakeJob('3')
];

const team = {
  access_token: 'abcd-111111111111-222222222222-333333333333-abcdefg123456abcdefg123456abcdef',
  incoming_webhook: {
    channel: '#jobs',
    channel_id: 'CABCD1234',
    configuration_url: 'https://teamname.slack.com/services/1234ABCDE',
    url : 'https://hooks.slack.com/services/TEFGH5678/1234ABCDE/hijklmn123456hijklmn1234'
  },
  ok: true,
  scope: 'identify,commands,incoming-webhook,team:read',
  team_id: 'TEFGH5678',
  team_name: 'teamname',
  user_id: 'UIJKL9012'
};

module.exports = { job, team, jobList };
