import { queryCache, useMutation } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useDeleteCheckmark() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useMutation(
    (checkmarkId) => {
      // Remove checkmark in the database
      return db.ref(`checkmarks/${user.uid}/${checkmarkId}`).remove();
    },
    {
      onMutate: (checkmarkId) => {
        // Store old checkmark
        const previousCheckmark = queryCache.getQueryData([
          'checkmark',
          checkmarkId,
        ]);

        // Set checkmark to null in the cache
        queryCache.setQueryData(['checkmark', checkmarkId], null);

        // On error revert to old checkmark
        return () =>
          queryCache.setQueryData(
            ['checkmark', checkmarkId],
            previousCheckmark
          );
      },
      onError: (error, checkmark, rollback) => rollback(),
      onSuccess: async (checkmarkId) => {
        queryCache.refetchQueries('checkmarks');
        await queryCache.refetchQueries(['checkmark', checkmarkId]);
      },
    }
  );
}
