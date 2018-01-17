const config = require('./src/config/index');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const router = require('./src/jobs/jobs.router');
const PORT = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: config.ALLOWED_ORIGINS }));
app.post('/jobs', router.post);
app.post('/slack', router.vote);
app.get('/jobs', router.list);
app.listen(PORT);
