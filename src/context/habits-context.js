import { queryCache } from 'react-query';
import * as React from 'react';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';

import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';
import { useAuth } from './auth-context';

const HabitsContext = React.createContext();
HabitsContext.displayName = 'HabitsContext';

function HabitsProvider(props) {
  const {
    data,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync({ data: [] });

  const { firebase, db, auth } = useFirebase();

  const { user } = useAuth();

  // React.useEffect(() => {
  //   db.ref('maciek/habits').on('value', snapshot => {
  //     let myData = [];

  //     if (snapshot.exists()) {
  //       setData(snapshot.val());
  //     }
  //   });
  // }, [db, setData]);
  const fetchHabits = React.useCallback((key) => {
    db.ref('maciek/habits').once('value', 
    snapshot => {
      let fetchedData = [];

      if (snapshot.exists()) {  
        snapshot.forEach(childSnapshot => {
          fetchedData.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
      } 
      setData(fetchedData);
    })
  }, [db, setData])

  React.useEffect(() => {
    fetchHabits()
  }, [fetchHabits]);


  // Sign in (email, password)
  const addHabit = React.useCallback(
    ({ name, description, frequency }) => {
      const newHabitRef = db.ref('maciek/habits').push();

      return newHabitRef.set({
        // position: 0,
        name,
        description,
        frequency,
        createdAt: new Date().toISOString(),
      });
    },
    [db]
  );

  // Context value
  const value = React.useMemo(
    () => ({
      data,
      addHabit,
      fetchHabits
    }),
    [data, addHabit, fetchHabits]
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    console.log('success');
    return <HabitsContext.Provider value={value} {...props} />;
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useHabits() {
  const context = React.useContext(HabitsContext);
  if (context === undefined) {
    throw new Error(`useHabits must be used within a HabitsProvider`);
  }
  return context;
}

export { HabitsProvider, useHabits };
