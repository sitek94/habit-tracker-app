import * as React from 'react';
import Firebase from 'api/firebase';

// Context
const FirebaseContext = React.createContext(null);
FirebaseContext.displayName = 'FirebaseContext';

// Provider
const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
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

