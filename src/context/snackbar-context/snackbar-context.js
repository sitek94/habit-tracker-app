import { createContext, useContext, useRef, useState } from 'react';

import Snackbar from './Snackbar';

// Context
const SnackbarContext = createContext();

const defaultSeverity = 'info';

// Provider
const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState(defaultSeverity);
  
  const openSnackbar = (severity, message) => {
    setIsOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
    setSeverity(defaultSeverity);
    setMessage(message);
  };

  const contextValue = useRef({ openSnackbar })

  return (
    <SnackbarContext.Provider value={contextValue.current}>
      {children}
      <Snackbar
        autoHideDuration={2000}
        message={message}
        severity={severity}
        open={isOpen}
        onClose={closeSnackbar}
      />
    </SnackbarContext.Provider>
  )
}

// Hook
function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within HabitsProvider');
  }

  return context;
}

export { SnackbarProvider, useSnackbar };
