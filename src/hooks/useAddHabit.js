import { useFirebase } from 'context/firebase-context';
import { queryCache, useMutation } from 'react-query';

export function useAddHabit() {
  const { db } = useFirebase();

  return useMutation(
    fields => {
      const { name, description, frequency } = fields;

      const newHabitRef = db.ref('maciek/habits').push();

      return newHabitRef.set({
        // position: 0,
        name,
        description,
        frequency,
        createdAt: new Date().toISOString(),
      });
    },
    {
      onSuccess: () => queryCache.refetchQueries('habits'),
    }
  );
}