import app from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from './firebase-config';

app.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();

export default app;
