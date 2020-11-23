import { useQuery } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useFetchHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (key, habitId) => {
    // Get habit database ref
    const habitRef = db.ref(`habits/${user.uid}/${habitId}`);

    // Get habit value
    habitRef.once('value').then((snapshot) => {
      // Check if the habit's data exists
      if (snapshot.exists()) {
        // Return habit id and the rest of the values
        return {
          id: habitId,
          ...snapshot.val(),
        };
      } else {
        // If there is no data return `null`
        return null;
      }
    });
  };
}

export function useHabit(habitId) {
  const fetchHabit = useFetchHabit();

  return useQuery(habitId && ['habit', habitId], fetchHabit);
}
