import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { queryCache, useMutation } from 'react-query';

export function useAddHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useMutation(
    (habit) => {
      const { name, description, frequency, position } = habit;

      // Get database ref for the new habit
      const newHabitRef = db.ref(`habits/${user.uid}`).push();

      // Set the habit in the database
      return newHabitRef.set({
        position,
        name,
        description,
        frequency,
        createdAt: new Date().toISOString(),
      });
    },
    {
      onSuccess: () => queryCache.invalidateQueries('habits'),
    }
  );
}
