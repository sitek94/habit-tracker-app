import { useFirebase } from 'context/firebase-context';
import { useMutation, queryCache } from 'react-query';

export function useSaveHabit() {
  const { db } = useFirebase();

  return useMutation(
    values => {
      const { name, description, frequency } = values;

      // Update habit in the database
      return db
        .ref(`maciek/habits/${values.id}`)
        .update({
          name,
          description,
          frequency,
        })
        // Success
        .then(() => values);
    },
    {
      onMutate: values => {
        const previousHabit = queryCache.getQueryData(['habit', values.id]);

        queryCache.setQueryData(['habit', values.id], old => ({
          ...old,
          ...values,
        }));

        return () =>
          queryCache.setQueryData(['habit', values.id], previousHabit);
      },
      onError: (error, values, rollback) => rollback(),
      onSuccess: async values => {
        queryCache.refetchQueries('habits');
        await queryCache.refetchQueries(['habit', values.id]);
      },
    }
  );
}
