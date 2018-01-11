const persistence = require('./src/jobs/jobs.persistence');

persistence.getAll().then(console.log);