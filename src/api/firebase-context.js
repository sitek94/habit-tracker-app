import { createContext, useEffect, useState } from 'react';

import app, { auth, firestore } from './firebase-init';

// Context
export const FirebaseContext = createContext(null);

// Provider
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Watch auth state change
  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []); 

  let firebase = {
    app,
    auth,
    db: firestore,
    user,
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

