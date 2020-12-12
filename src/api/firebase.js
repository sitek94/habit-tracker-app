import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

import firebaseConfig from './firebase-config';

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);

    this.firebase = firebase;
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.db = firebase.database();
  }
}

export default Firebase;
