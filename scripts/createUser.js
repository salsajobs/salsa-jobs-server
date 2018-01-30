// DO NOT RUN DIRECTLY, USE FROM NPM SCRIPTS INSTEAD!

// This script is a helper used to create firebase users with read/write permissions.

var admin = require('firebase-admin');
var serviceAccount = require('./credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
  databaseURL: process.env.FIREBASE_URL,
});

admin.auth().createUser({ uid: 'staging' })
  .then(console.log)
  .catch(console.error);