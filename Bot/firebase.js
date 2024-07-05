const firebaseAdmin = require('firebase-admin');
const serviceAccount = require('../../complete/lunar/Bot/serviceAccountKey.json');

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://lunar-2ac46-default-rtdb.firebaseio.com"
});

module.exports = firebaseAdmin.firestore();
