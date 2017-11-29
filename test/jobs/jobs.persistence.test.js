jest.setMock('node-fetch', jest.fn().mockImplementation(() => Promise.resolve()));

const persistence = require('../../src/jobs/jobs.persistence');
const config = require('../../src/config');
const fetchMock = require('node-fetch');

describe('jobs.persistence', () => {
    const offer = { text: 'mockText' };
    it('should save a offer', done => {
        persistence.saveOffer(offer).then(() => {
            expect(fetchMock).toBeCalledWith(config.FIREBASE_SERVER, { method: 'POST', body: `{ "url" : "${offer.text}" }` });
            done();
        });
    });
});

