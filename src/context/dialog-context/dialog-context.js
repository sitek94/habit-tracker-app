import  { createContext, useContext, useState, useRef } from 'react';

import DialogContainer from './Dialog';

// Context
const DialogContext = createContext();

// Provider
const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  const openDialog = props => {
    const dialog = { ...props, open: true };
    setDialogs(dialogs => [...dialogs, dialog]);
  }

  const closeDialog =() => {
    setDialogs(dialogs => {
      const latestDialog= dialogs.pop();

      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();

      return [...dialogs].concat({ ...latestDialog, open: false });
    })
  }

  const contextValue = useRef({openDialog, closeDialog});

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => (
        <DialogContainer key={i} {...dialog} onClose={closeDialog} />
      ))}
    </DialogContext.Provider>
  );
};

// Hook
function useDialog() {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within HabitsProvider');
  }

  return context;
}

export { DialogProvider, useDialog };
