import firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = { // ethgameservices-dev
  apiKey: "AIzaSyC4yAASjJTw0EaYZEntc4bbmgnT77d2Pec",
  authDomain: "ethgameservices-dev.firebaseapp.com",
  projectId: "ethgameservices-dev",
  storageBucket: "ethgameservices-dev.appspot.com",
  messagingSenderId: "270414835613",
  appId: "1:270414835613:web:e5ad7943810100ad560974"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();
export { auth, database, googleAuthProvider, githubAuthProvider, facebookAuthProvider, twitterAuthProvider };
