const jobService = require('../src/jobs/jobs.service');

const _fakePayload = {
  channel_id: 'channel_id_mock',
  user_id: 'user_id_mock',
  text: 'https://example.com/foo/bar fake_description'
};

const offer = jobService.createJob(_fakePayload);

module.exports = { offer };
