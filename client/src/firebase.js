import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyA633JIJABbbQeldYwNn7H9FTnAo-BPGy4",
  authDomain: "focus-stream-d64a2.firebaseapp.com",
  databaseURL: "https://focus-stream-d64a2.firebaseio.com",
  projectId: "focus-stream-d64a2",
  storageBucket: "focus-stream-d64a2.appspot.com",
  messagingSenderId: "156165224472",
  appId: "1:156165224472:web:3c9046bdc75380b584eb6d",
  measurementId: "G-09B5E5Y5ME"
};
var fire = firebase.initializeApp(firebaseConfig);
export default fire;
