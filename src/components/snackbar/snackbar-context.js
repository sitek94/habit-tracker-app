const { createContext } = require('react');

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children, openSnackbar }) => {
  const value = {
    openSnackbar
  }

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  )
}