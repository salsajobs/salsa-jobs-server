const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');

describe('jobs.controller', () => {
  describe('.postJob', () => {
    it('should create a new job when the job does not exist in the database', () => {
      spyOn(persistence, 'getJob').and.returnValue(Promise.resolve(null));
      spyOn(persistence, 'saveJob').and.returnValue(Promise.resolve({}));

      return controller.postJob().then(response => {
        expect(response.job).toEqual({});
        expect(response.existing).toEqual(false);
        expect(persistence.saveJob).toHaveBeenCalled();
      });
    });

    it('should not create a new job when the job already exists in the database', () => {
      spyOn(persistence, 'getJob').and.returnValue(Promise.resolve({}));
      spyOn(persistence, 'saveJob').and.returnValue(Promise.resolve({}));

      return controller.postJob().then(response => {
        expect(response.job).toEqual({});
        expect(response.existing).toEqual(true);
        expect(persistence.saveJob).not.toHaveBeenCalled();
      });
    });
  });

  describe('.vote', () => {
    it('should update the job votes in the persistence', () => {
      spyOn(persistence, 'vote').and.returnValue(Promise.resolve());
      spyOn(persistence, 'getJobById').and.returnValue(Promise.resolve());
      expect(persistence.vote).not.toHaveBeenCalled();

      return controller.vote('fakeId', 'fakeUid', 'fakeType').then(() => {
        expect(persistence.vote).toHaveBeenCalledWith('fakeId', 'fakeUid', 'fakeType');
      });
    });
  });

  describe('.getAll', () => {
    it('should return an empty list when there are no jobs in the database', () => {
      spyOn(persistence, 'getAll').and.returnValue(Promise.resolve([]));
      return controller.getAll().then(result => {
        expect(result).toEqual([]);
      });
    });

    it('should return a list of well formatted jobs when there are jobs on the database', () => {
      spyOn(persistence, 'getAll').and.returnValue(Promise.resolve([{
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

      return controller.getAll().then(result => {
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
      });
    });
  });
});
