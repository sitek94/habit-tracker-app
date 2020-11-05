const { createContext, useContext } = require('react');

const SnackbarContext = createContext();

const SnackbarProvider = ({ children, openSnackbar }) => {
  const value = {
    openSnackbar
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}

function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (context === undefined) {
    throw new Error('useSnackbar must be used within HabitsProvider');
  }

  return context;
}

export { SnackbarProvider, useSnackbar };
