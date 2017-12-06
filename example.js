const crypto = require('crypto');
const hash = data => crypto.createHash('md5').update(data).digest("hex");

const firebase = require('firebase');


const firebaseApp = firebase.initializeApp({
    databaseURL: 'https://nsjobs-f8648.firebaseio.com'
});

const firebaseDatabase = firebase.database();

const ref = firebaseDatabase.ref('jobs');


/*

Esta regla asegura que el ID sea unico:

 {
  "rules": {
    "jobs": {
      ".read": "true",
      "$jobs_id":{
          ".write": true,
          ".validate":"!data.exists()"
        }
    }
  }
}

 */

return ref.child(hash('https://nsjobs-f8648.firebaseioss.com')).set({ link: 'somelink' });


