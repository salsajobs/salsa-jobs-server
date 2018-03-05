const config = require('./index');

const DATABASE_NAME = config.DATABASE_NAME;
const FIREBASE_URL = config.FIREBASE_URL;
const FIREBASE_API_KEY = config.FIREBASE_API_KEY;
const FIREBASE_CREDENTIALS = config.FIREBASE_CREDENTIALS;

const app = firebase.initializeApp({  apiKey: FIREBASE_API_KEY, databaseURL: FIREBASE_URL });
firebase.auth(app).signInWithCustomToken(FIREBASE_CREDENTIALS);

const FirebaseDatabase = firebase.database();
const ref = FirebaseDatabase.ref(DATABASE_NAME);

module.exports = { ref };
