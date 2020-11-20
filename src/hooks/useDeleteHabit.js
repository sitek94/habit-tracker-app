import { useFirebase } from 'context/firebase-context';
import { queryCache, useMutation } from 'react-query';

export function useDeleteHabit() {
  const { db } = useFirebase();

  return useMutation(
    habitId => {
      const updates = {};

      updates[`maciek/habits/${habitId}`] = null;

      return db.ref().update(updates);
    },
    {
      onSuccess: () => queryCache.refetchQueries('habits'),
    }
  );
}
