import LaunchScreen from 'components/loader';
import { createContext, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import useHabitsData from './useHabitsData';

const HabitsContext = createContext();

const HabitsProvider = ({ children }) => {
  const [{habits, isLoading, isError}, setHabits] = useHabitsData();
  
  if (isLoading) return <LaunchScreen />

  if (isError) return <Redirect to="/error" />

  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>{children}</HabitsContext.Provider>
  );
};

function useHabits() {
  const context = useContext(HabitsContext);

  if (context === undefined) {
    throw new Error('useHabits must be used within HabitsProvider');
  }

  return context;
}

export { HabitsProvider, useHabits };
