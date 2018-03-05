// Get firebase access on start
require('./scripts/generateToken').generateToken().then(token => {
  process.env.FIREBASE_CREDENTIALS = token;

  const config = require('./src/config/index');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const app = require('express')();
  const jobsRouter = require('./src/jobs/jobs.router');
  const oauthRouter = require('./src/oauth/oauth.router');

  const PORT = process.env.PORT || 3000;

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors({ origin: config.ALLOWED_ORIGINS }));

  app.get('/jobs', jobsRouter.list);
  app.post('/jobs', jobsRouter.post);
  app.post('/slack', jobsRouter.vote);

  app.get('/login', oauthRouter.login);

  app.listen(PORT);
});
