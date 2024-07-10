const firebaseAdmin = require('firebase-admin');
const path = require('path');

// Use the absolute path for testing
const serviceAccountPath = path.resolve('C:/Users/HP/OneDrive/Desktop/Completed/thelunar/Bot/serviceAccountKey.json');

// Import the service account key JSON
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK
try {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: "https://test-f326f-default-rtdb.firebaseio.com"
  });
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

// Export Firestore instance
const firestore = firebaseAdmin.firestore();
module.exports = firestore;
