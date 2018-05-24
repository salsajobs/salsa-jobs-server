const jobsService = require('../../src/jobs/jobs.service.js');

describe('jobs.service', () => {
  describe('.createJob', () => {
    it('should create a new job object from a slack message payload', () => {
      const fakePayload = {
        channel_id: 'channel_id_mock',
        user_id: 'user_id_mock',
        text: 'https://example.com/foo/bar fake_description'
      };

      const job = jobsService.createJob(fakePayload);

      expect(job.id).toBeDefined();
      expect(job.link).toEqual('https://example.com/foo/bar');
      expect(job.createdAt).toBeDefined();
      expect(job.description).toEqual('fake_description');
      expect(job.text).toEqual(fakePayload.text);
      expect(job.meta.channel_id).toEqual(fakePayload.channel_id);
      expect(job.meta.user_id).toEqual(fakePayload.user_id);
    });
  });
});
