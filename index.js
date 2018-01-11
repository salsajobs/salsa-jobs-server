const config = require('./src/config/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 3000;
const jobsRoutes = require('./src/jobs/jobs.routes');
const slackRoutes = require('./src/slack/slack.routes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: config.ALLOWED_ORIGINS }));
app.get('/jobs', jobsRoutes.list);
app.post('/jobs', jobsRoutes.broadcast);
app.post('/slack', slackRoutes.sendMessage);

app.listen(PORT);
