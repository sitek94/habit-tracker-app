import { useMutation, useQueryCache } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useAddCheckmark() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
    (checkmark) => {
      // Get checkmark ref in the database
      const newCheckmarkRef = db.ref(`checkmarks/${user.uid}`).push();
      const newCheckmarkId = newCheckmarkRef.key;

      // Update the checkmark in the database
      return newCheckmarkRef.set(checkmark).then(() => ({
        id: newCheckmarkId,
        ...checkmark,
      }));
    },
    {
      // When mutate is called:
      onMutate: (checkmark) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        cache.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = cache.getQueryData('checkmarks');

        // Optimistically add new checkmark
        cache.setQueryData('checkmarks', (old) => [...old, checkmark]);

        // Return a context object with the snapshotted value
        return { previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        cache.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => cache.invalidateQueries('checkmarks'),
    }
  );
}
