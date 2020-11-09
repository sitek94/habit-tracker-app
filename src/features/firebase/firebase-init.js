import app from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

import firebaseConfig from './firebase-config';

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const database = app.database();

export default app;
