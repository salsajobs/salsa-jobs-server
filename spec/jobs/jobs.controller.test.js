const controller = require('../../src/jobs/jobs.controller');
const persistence = require('../../src/jobs/jobs.persistence');

describe('jobs.controller', () => {
  describe('.postJob', () => {
    describe('when the job does not exist on the database', () => {
      let fakeJobPromise;
      let fakeJob;
      beforeEach(() => {
        fakeJob = 'fakejob';
        fakeJobPromise = Promise.resolve(fakeJob);
        spyOn(persistence, 'getJob').and.returnValue(Promise.resolve(null));
        spyOn(persistence, 'saveJob').and.returnValue(fakeJobPromise);
      });

      it('should create a new job', () => {
        expect(persistence.saveJob).not.toHaveBeenCalled();
        return controller.postJob().then(() => expect(persistence.saveJob).toHaveBeenCalled());
      });

      it('should return a flag indicating the offer didnt exist', () => {
        expect(persistence.saveJob).not.toHaveBeenCalled();
        return controller.postJob().then(response => expect(response.existing).toBeFalsy());
      });

      it('should return the job', () => {
        expect(persistence.saveJob).not.toHaveBeenCalled();
        return controller.postJob().then(response => expect(response.job).toEqual(fakeJob));
      });
    });

    describe('when the job already exists on the database', () => {
      let fakeJobPromise;
      let fakeJob;
      beforeEach(() => {
        fakeJob = 'fakejob';
        fakeJobPromise = Promise.resolve(fakeJob);
        spyOn(persistence, 'getJob').and.returnValue(fakeJobPromise);
        spyOn(persistence, 'saveJob').and.returnValue(fakeJobPromise);
      });

      it('should not create a new job', () => {
        return controller.postJob().then(() => expect(persistence.saveJob).not.toHaveBeenCalled());
      });

      it('should return a flag indicating the offer already exist', () => {
        expect(persistence.saveJob).not.toHaveBeenCalled();
        return controller.postJob().then(response => expect(response.existing).toBeTruthy());
      });

      it('should return the job', () => {
        return controller.postJob().then(response => expect(response.job).toEqual(fakeJob));
      });
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
      }]);
    });
  });
});
