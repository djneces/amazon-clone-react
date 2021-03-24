//firebase user authentication, this connect to the Firebase
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'clone-529d0.firebaseapp.com',
  projectId: 'clone-529d0',
  storageBucket: 'clone-529d0.appspot.com',
  messagingSenderId: '674567934060',
  appId: '1:674567934060:web:346b006c59314d12bac849',
  measurementId: 'G-79NXPSEF5X',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
