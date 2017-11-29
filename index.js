const app = require('express')();
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 3000;
const jobsRoutes = require('./src/jobs/jobs.routes');

// Config express to parse the slack http requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/jobs', jobsRoutes.postJob);

app.listen(PORT);