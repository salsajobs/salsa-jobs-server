const JOBS_DATABASE = 'jobs';
// const FIREBASE_URL = 'https://salsadev-8191f.firebaseio.com';
const FIREBASE_URL = 'https://nsjobs-f8648.firebaseio.com'
const SLACK_BOT_URL = 'https://hooks.slack.com/services/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';
const LOGS_ACTIVE = true; // TODO set env variables
const ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'https://nsjobs-f8648.firebaseapp.com'
]
module.exports = { FIREBASE_URL, SLACK_BOT_URL, JOBS_DATABASE, LOGS_ACTIVE, ALLOWED_ORIGINS };
