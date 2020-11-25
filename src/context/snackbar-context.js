import { createContext, useContext, useRef, useState } from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/core';

// Context
const SnackbarContext = createContext();

// Provider
const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  const openSnackbar = (severity, message) => {
    setIsOpen(true);
    setSeverity(severity);
    setMessage(message);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  };

  const contextValue = useRef({ openSnackbar });

  return (
    <SnackbarContext.Provider value={contextValue.current}>
      {children}
      <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          variant="filled"
          elevation={6}
          severity={severity}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Hook
function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within SnackbarProvider');
  }

  return context;
}

export { SnackbarProvider, useSnackbar };
