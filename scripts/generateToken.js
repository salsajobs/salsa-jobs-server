const UID = 'staging';
var admin = require('firebase-admin');

const serviceAccount = {
  type: process.env.FRB_CRED_TYPE,
  project_id: process.env.FRB_PROJECT_ID,
  private_key_id: process.env.FRB_KEY_ID,
  private_key: process.env.FRB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FRB_CLIENT_EMAIL,
  client_id: process.env.FRB_CLIENT_ID,
  auth_uri: process.env.FRB_AUTH_URI,
  token_uri: process.env.FRB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FRB_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FRB_AUTH_PROVIDER_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_URL
});


function generateToken() {
  return admin.auth().createCustomToken(UID);
}


module.exports = {
  generateToken,
};
