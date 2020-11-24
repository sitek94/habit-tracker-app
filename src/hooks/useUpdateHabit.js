import { useMutation, useQueryCache } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useUpdateHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
    (habit) => {
      const { id, name, description, frequency } = habit;

      // Get checkmark database ref
      const habitRef = db.ref(`habits/${user.uid}/${id}`);

      // Update the habit in the database
      return (
        habitRef
          .update({
            name,
            description,
            frequency,
          })
          // Return the habit object so it can be used in `onMutate`, etc.
          .then(() => habit)
      );
    },
    {
      // When mutate is called:
      onMutate: (habit) => {
        const previousHabit = cache.getQueryData(['habit', { id: habit.id }]);

        // Snapshot previous values
        cache.setQueryData(['habit', { id: habit.id }], (old) => ({
          ...old,
          ...habit,
        }));

        // Return a context object with the snapshotted value
        return { previousHabit };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        cache.setQueryData('habits', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSuccess: async (habit) => {
        cache.refetchQueries('habits');
        await cache.refetchQueries(['habit', { id: habit.id }]);
      },
    }
  );
}
