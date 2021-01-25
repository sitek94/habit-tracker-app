import * as React from 'react';

// Context
const DrawerContext = React.createContext();

// Provider
function DrawerProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Close drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Toggle drawer
  const onDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const context = {
    isDrawerOpen,
    closeDrawer,
    onDrawerToggle,
  };

  return (
    <DrawerContext.Provider value={context}>{children}</DrawerContext.Provider>
  );
}

// Hook
function useDrawer() {
  const context = React.useContext(DrawerContext);

  if (context === 'undefined') {
    throw new Error(`useDrawer must be used within a DrawerProvider`);
  }

  return context;
}

export { DrawerProvider, useDrawer };

