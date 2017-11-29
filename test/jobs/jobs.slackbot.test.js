jest.setMock('node-fetch', jest.fn().mockImplementation(() => Promise.resolve()));

const slackbot = require('../../src/jobs/jobs.slackbot');
const config = require('../../src/config');
const fetchMock = require('node-fetch');

describe('jobs.slackbot', () => {
    const offer = { text: 'mockText' };
    it('should broadcast an offer', done => {
        slackbot.broadcast(offer).then(() => {
            expect(fetchMock).toBeCalledWith(config.SLACK_BOT_URL, { method: 'POST', body: '{"text":"mockText"}' });
            done();
        });
    });
});

