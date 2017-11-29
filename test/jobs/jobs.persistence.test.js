jest.setMock('node-fetch', jest.fn().mockImplementation(() => Promise.resolve()));

const persistence = require('../../src/jobs/jobs.persistence');
const config = require('../../src/config');
const fetchMock = require('node-fetch');

describe('jobs.persistence', () => {
    const mockOffer = {
        createdAt: Date.now(),
        link: 'https://example.com/job-offer',
        description: 'Developer at foo.com',
        text: 'Developer at foo.com https://example.com/job-offer'
    };
    it('should save a offer', done => {
        persistence.saveOffer(mockOffer).then(() => {
            expect(fetchMock).toBeCalledWith(config.FIREBASE_SERVER, { method: 'POST', body: JSON.stringify(mockOffer) });
            done();
        });
    });
});

