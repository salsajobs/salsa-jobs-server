// DO NOT RUN DIRECTLY, USE FROM NPM SCRIPTS INSTEAD!

// This script is a helper used to create firebase tokens in order to read/write from the database.
// https://firebase.google.com/docs/auth/admin/create-custom-tokens?hl=es-419

const uid = 'staging';
var admin = require('firebase-admin');

var serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL 
});

admin.auth().createCustomToken(uid).then(console.log).catch(console.error);