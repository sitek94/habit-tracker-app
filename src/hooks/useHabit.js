import { useFirebase } from 'context/firebase-context';
import { useQuery } from 'react-query';

export function useFetchHabit() {
  const { db } = useFirebase();

  return (key, habitId) => db.ref(`maciek/habits/${habitId}`)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {

        return {
          id: habitId,
          ...snapshot.val()
        }
      } else {
        return null;
      }
    });
}

export function useHabit(habitId) {
  const fetchHabit = useFetchHabit();

  return useQuery(habitId && ['habit', habitId], fetchHabit);
}
