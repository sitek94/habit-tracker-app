import { createContext, useContext } from 'react';

import { useHabits } from 'hooks';

// Context
const HabitsContext = createContext(null);

// Provider
const HabitsProvider = ({ children }) => {
  const habitsObject = useHabits();

  return (
    <HabitsContext.Provider value={habitsObject}>
      {children}
    </HabitsContext.Provider>
  )
}

// Hook
function useHabitsValue() {
  const context = useContext(HabitsContext);

  if (context === undefined) {
    throw new Error('useHabits must be used within HabitsProvider');
  }

  return context;
}

export { HabitsProvider, useHabitsValue };