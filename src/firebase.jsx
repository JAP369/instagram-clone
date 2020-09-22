import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAT1j5Wh8xmZyaUF3lBlah308lBpmnjq_8',
  authDomain: 'instagram-clone-daf85.firebaseapp.com',
  databaseURL: 'https://instagram-clone-daf85.firebaseio.com',
  projectId: 'instagram-clone-daf85',
  storageBucket: 'instagram-clone-daf85.appspot.com',
  messagingSenderId: '693966003149',
  appId: '1:693966003149:web:eeeaac3363d28d45514284',
  measurementId: 'G-XGPVR3LHBC',
});

const db = firebaseApp.firestore(); // collection data from firestore
const auth = firebase.auth(); // login & logout
const storage = firebase.storage(); // to upload & store images

export { db, auth, storage };
