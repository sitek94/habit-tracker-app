import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useMutation, useQueryCache } from 'react-query';

export function useDeleteHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();
  
  return useMutation(
    (habitId) => {
      // Remove the habit in the database
      return db.ref(`habits/${user.uid}/${habitId}`).remove();
    },
    {
      // When mutate is called:
      onMutate: async (habitId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries('habits');

        // Snapshot previous values
        const previousHabits = cache.getQueryData('habits');

        // Optimistically remove the habit from cache
        cache.setQueryData('habits', (old) =>
          old.filter((habit) => habit.id !== habitId)
        );

        // Return a context object with the snapshotted value
        return { previousHabits };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, habitId, context) => {
        cache.setQueryData('habits', context.previousHabits);
      },
      // Always refetch after error or success:
      onSettled: () => cache.invalidateQueries('habits'),
    }
  );
}
