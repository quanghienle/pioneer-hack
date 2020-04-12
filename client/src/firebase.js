import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyDbstxZYopUVfkqv1QGRsTH8T0a3NoocMY",
  authDomain: "pioneer-hack.firebaseapp.com",
  databaseURL: "https://pioneer-hack.firebaseio.com",
  projectId: "pioneer-hack",
  storageBucket: "pioneer-hack.appspot.com",
  messagingSenderId: "933064029885",
  appId: "1:933064029885:web:c75afd6dac7119c36b69d4",
  measurementId: "G-KTVZXVSZ6H"
};
var fire = firebase.initializeApp(firebaseConfig);
export default fire;