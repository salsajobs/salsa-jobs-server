const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');
const { job } = require('../mocks');

describe('jobs.controller', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('.postJob', () => {
    it('should create a new job when the job does not exist in the database', done => {
      jest.spyOn(persistence, 'getJob').mockImplementation(() => Promise.resolve(false));
      jest.spyOn(persistence, 'saveJob').mockImplementation(() => Promise.resolve());
      expect(persistence.saveJob).not.toHaveBeenCalled();

      controller.postJob(job).then(() => {
        expect(persistence.saveJob).toBeCalledWith(job);
        done();
      });
    });

    it('should not create a new job when the job already exists in the database', done => {
      jest.spyOn(persistence, 'getJob').mockImplementation(() => Promise.resolve(true));
      jest.spyOn(persistence, 'saveJob').mockImplementation(() => Promise.resolve());
      expect(persistence.saveJob).not.toHaveBeenCalled();

      controller.postJob(job).then(() => {
        expect(persistence.saveJob).not.toHaveBeenCalled();
        done();
      });
    });
  });

  describe('.vote', () => {
    it('should update the job votes in the persistence', done => {
      jest.spyOn(persistence, 'vote').mockImplementation(() => Promise.resolve());
      jest.spyOn(persistence, 'getJobById').mockImplementation(() => Promise.resolve());
      expect(persistence.vote).not.toHaveBeenCalled();

      controller.vote('fakeId', 'fakeUid', 'fakeType').then(() => {
        expect(persistence.vote).toBeCalledWith('fakeId', 'fakeUid', 'fakeType');
        done();
      });
    });
  });

  describe('.getAll', () => {
    it('should return an empty list when there are no jobs in the database', done => {
      jest.spyOn(persistence, 'getAll').mockImplementation(() => Promise.resolve([]));
      controller.getAll().then(result => {
        expect(result).toEqual([]);
        done();
      });
    });

    it('should return a list of well formatted jobs when there are jobs on the database', done => {
      jest.spyOn(persistence, 'getAll').mockImplementation(() => Promise.resolve([{
        id: 'fake_id',
        createdAt: 1516213783482,
        description: 'fake_description',
        link: 'https://fake-link.con',
        votes: {
          id0: 'upvote',
          id1: 'upvote',
          id2: 'downvote',
        },
        meta: {}
      }]));

      controller.getAll().then(result => {
        expect(result).toEqual([{
          createdAt: 1516213783482,
          description: 'fake_description',
          link: 'https://fake-link.con',
          votes: {
            upvotes: 2,
            downvotes: 1
          },
          meta: {}
        }]);
        done();
      });
    });
  });
});
