import { useMutation, useQueryCache } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useDeleteCheckmark() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
    (checkmarkId) => {
      // Remove the checkmark in the database
      return db.ref(`checkmarks/${user.uid}/${checkmarkId}`).remove();
    },
    {
      // When mutate is called:
      onMutate: async (checkmarkId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = cache.getQueryData('checkmarks');

        // Optimistically remove the checkmark from cache
        cache.setQueryData('checkmarks', (old) =>
          old.filter((checkmark) => checkmark.id !== checkmarkId)
        );

        // Return a context object with the snapshotted value
        return { previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, checkmarkId, context) => {
        cache.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => cache.invalidateQueries('checkmarks'),
    }
  );
}