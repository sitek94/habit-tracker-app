import * as React from 'react';
import firebase, { auth, database as db, firestore } from 'services/firebase/firebase-init';

// Context
const FirebaseContext = React.createContext(null);
FirebaseContext.displayName = 'FirebaseContext';

// Provider
const FirebaseProvider = ({ children }) => {
  const value = {
    firebase,
    firestore,
    auth,
    db,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook
function useFirebase() {
  const context = React.useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useFirebase must be used within FirebaseProvider');
  }

  return context;
}

export { FirebaseProvider, useFirebase };

