const DATABASE_NAME = process.env.DATABASE_NAME;
const FIREBASE_URL = process.env.FIREBASE_URL;
const SLACK_BOT_URL = process.env.SLACK_BOT_URL;
const ALLOWED_ORIGINS = ['http://localhost:8080', 'https://nsjobs-f8648.firebaseapp.com'];
module.exports = { FIREBASE_URL, SLACK_BOT_URL, DATABASE_NAME, ALLOWED_ORIGINS };
