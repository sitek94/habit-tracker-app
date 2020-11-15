import { createContext, useContext } from 'react';

import { useHabitsData } from 'hooks';

// Context
const HabitsContext = createContext(null);

// Provider
const HabitsProvider = ({ children }) => {
  const {
    habits,
    setHabits,
    status,
    error,
    isLoading,
    isError,
  } = useHabitsData();

  return (
    <HabitsContext.Provider
      value={{ habits, setHabits, status, error, isLoading, isError }}
    >
      {children}
    </HabitsContext.Provider>
  );
};

// Hook
function useHabits() {
  const context = useContext(HabitsContext);

  if (context === undefined) {
    throw new Error('useHabits must be used within HabitsProvider');
  }

  return context;
}

export { HabitsProvider, useHabits };
