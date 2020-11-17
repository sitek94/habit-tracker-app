import { createContext, useContext } from 'react';

import { useCheckmarksData } from './use-checkmarks-data';

// Context
const CheckmarksContext = createContext(null);

// Provider
const CheckmarksProvider = ({ children }) => {
  const checkmarksData = useCheckmarksData();

  return (
    <CheckmarksContext.Provider value={checkmarksData}>
      {children}
    </CheckmarksContext.Provider>
  );
};

// Hook
function useCheckmarks() {
  const context = useContext(CheckmarksContext);

  if (context === undefined) {
    throw new Error('useCheckmarks must be used within CheckmarksProvider');
  }

  return context;
}

export { CheckmarksProvider, useCheckmarks };
