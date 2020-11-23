import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useMutation, useQueryCache } from 'react-query';

export function useUpdateCheckmarkValue() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
    (checkmark) => {
      // Get checkmark database ref
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${checkmark.id}`);

      // Update checkmark value in the database
      return checkmarkRef.update({
        value: checkmark.value,
      });
    },
    {
      // When mutate is called:
      onMutate: async (newCheckmark) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        await cache.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = cache.getQueryData('checkmarks');

        // Optimistically update to the new checkmark value
        cache.setQueryData('checkmarks', old => old.map(checkmark => {
          if (checkmark.id === newCheckmark.id) {
            return {
              ...checkmark,
              ...newCheckmark
            }
          } else {
            return checkmark;
          }
        }));

        // Return a context object with the snapshotted value
        return { previousCheckmarks }
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
