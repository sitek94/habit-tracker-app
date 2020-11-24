import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useMutation, useQueryCache } from 'react-query';

export function useDeleteHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
    async (habitId) => {
      // When deleting the habit we have to delete both the habit
      // and all the habit's checkmarks
      return (
        db
          // Find all the the habit's checkmarks
          .ref(`checkmarks/${user.uid}`)
          .orderByChild('habitId')
          .equalTo(habitId)
          .once('value')
          .then((checkmarks) => {
            const updates = {};

            // For each checkmark create an update that removes it
            checkmarks.forEach((checkmark) => {
              updates[`checkmarks/${user.uid}/${checkmark.key}`] = null;
            });

            // Remove habit update
            updates[`habits/${user.uid}/${habitId}`] = null;

            // Make the updates
            return db
              .ref()
              .update(updates)
              .then(() => habitId);
          })
      );
    },
    {
      // When mutate is called:
      onMutate: async (habitId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries('habits');
        await cache.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousHabits = cache.getQueryData('habits');
        const previousCheckmarks = cache.getQueryData('checkmarks');

        // Optimistically remove the habit from cache
        cache.setQueryData('habits', (old) =>
          old.filter((habit) => habit.id !== habitId)
        );

        // Optimistically remove the habit's checkmarks from cache
        cache.setQueryData('checkmarks', (old) =>
          old.filter((checkmark) => checkmark.habitId !== habitId)
        );

        // Return a context object with the snapshotted value
        return { previousHabits, previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, habitId, context) => {
        cache.setQueryData('habits', context.previousHabits);
        cache.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => { 
        cache.invalidateQueries('habits');
        cache.invalidateQueries('checkmarks');
      }
    }
  );
}
