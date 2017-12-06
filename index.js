const app = require('express')();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
const jobsRoutes = require('./src/jobs/jobs.routes');


app.post('/jobs', jobsRoutes.postJob);

app.listen(PORT);