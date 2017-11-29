const Offer = require('../../src/jobs/Offer');

describe('jobs.Offer', () => {
    describe('Constructor', () => {
        it('should throw an error when there is no link', () => {
            expect(() => new Offer('textMock')).toThrow();
        });

        it('should create a new object [01]', () => {
            const offer = new Offer('Frontend developer http://example.com/job.pdf');

            expect(offer.link).toEqual('http://example.com/job.pdf');
            expect(offer.createdAt).toBeDefined();
            expect(offer.description).toEqual('Frontend developer');
            expect(offer.text).toEqual('Frontend developer http://example.com/job.pdf');
        });

        it('should create a new object [02]', () => {
            const offer = new Offer('Software engineer https://example.com/foo/bar');

            expect(offer.link).toEqual('https://example.com/foo/bar');
            expect(offer.createdAt).toBeDefined();
            expect(offer.description).toEqual('Software engineer');
            expect(offer.text).toEqual('Software engineer https://example.com/foo/bar');
        });

        it('should create a new object [03]', () => {
            const offer = new Offer('https://example.com/foo/bar We are looking for a software expert');

            expect(offer.link).toEqual('https://example.com/foo/bar');
            expect(offer.createdAt).toBeDefined();
            expect(offer.description).toEqual('We are looking for a software expert');
            expect(offer.text).toEqual('https://example.com/foo/bar We are looking for a software expert');
        });
    });
});

