import { queryCache, useMutation } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useAddCheckmark() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useMutation(
    (checkmark) => {
      const { id, habitId, date, value } = checkmark;

      // Get checkmark ref in the database
      const newCheckmarkRef = db.ref(`checkmarks/${user.uid}/${id}`);

      // Create checkmark in the database
      return (
        newCheckmarkRef
          .set({
            habitId,
            date,
            value,
          })
          // Return the checkmark so it can be used in `onMutate`, etc.
          .then(() => checkmark)
      );
    },
    {
      // Optimistically update the cache on mutate
      onMutate: (checkmark) => {
        const { habitId, date, value } = checkmark;

        // Update the cache with checkmarks properties
        queryCache.setQueryData(['checkmark', checkmark.id], {
          habitId,
          date,
          value,
        });

        // In case of error, revert the checkmark to null
        return () => queryCache.setQueryData(['checkmark', checkmark.id], null);
      },
      onError: (error, checkmark, rollback) => rollback(),
      onSuccess: async (checkmark) => {
        queryCache.refetchQueries('checkmarks');
        await queryCache.refetchQueries(['checkmark', checkmark.id]);
      },
    }
  );
}
