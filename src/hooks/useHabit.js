import { useQuery } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useFetchHabitById() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (key, { id }) => {
    // Get habit database ref
    const habitRef = db.ref(`habits/${user.uid}/${id}`);

    // Get habit value
    return habitRef.once('value').then((snapshot) => {
      // Check if the habit's data exists
      if (snapshot.exists()) {
        // Return habit id and the rest of the values
        return {
          id,
          ...snapshot.val(),
        };
      } else {
        // If there is no data return `null`
        return null;
      }
    });
  };
}

export function useHabitById(habitId) {
  const fetchHabitById = useFetchHabitById();

  return useQuery(habitId && ['habit', { id: habitId }], fetchHabitById, {
    enabled: habitId !== null,
  });
}
