import { createContext, useContext, useEffect, useState } from 'react';

import firebase, { auth, firestore, database } from './firebase-init';

// Context
const FirebaseContext = createContext(null);

// Provider
const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Watch auth state change
  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []); 

  let value = {
    firebase,
    auth,
    db: database,
    firestore,
    user,
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}

// Hook
function useFirebase() {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }

  return context;
}

export { FirebaseProvider, useFirebase };