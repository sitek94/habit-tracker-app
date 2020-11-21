import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useMutation, queryCache } from 'react-query';
import { EMPTY } from 'data/constants';

export function useUpdateCheckmark() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useMutation(
    ({ habitId, date, value }) => {
      // Update habit in the database
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${habitId}/${date}`);

      if (value === EMPTY) {
        return checkmarkRef.remove();
      } else {
        return checkmarkRef.set(value);
      }
    },
    {
      onMutate: ({ habitId, date, value }) => {
        queryCache.cancelQueries('checkmarks');

        const previousCheckmarks = queryCache.getQueryData('checkmarks');

        const newCheckmarks = {
          ...previousCheckmarks,
        };
        newCheckmarks[habitId][date] = value;

        queryCache.setQueryData('checkmarks', (old) => newCheckmarks);

        return () => queryCache.setQueryData('checkmarks', previousCheckmarks);
      },
      onError: (error, values, rollback) => rollback(),
      onSettled: () => queryCache.invalidateQueries('checkmarks'),
      // onSuccess: () => queryCache.refetchQueries('checkmarks'),
    }
  );
}
