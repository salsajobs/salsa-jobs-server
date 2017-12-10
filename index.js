const bodyParser = require('body-parser');
const app = require('express')();
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
const jobsRoutes = require('./src/jobs/jobs.routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/jobs', jobsRoutes.postJob);
app.post('/slack', jobsRoutes.slackResponse);

app.listen(PORT);
