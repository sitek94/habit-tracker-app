import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { EMPTY } from 'data/constants';

/**
 * Returns a function that adds a checkmark
 */
export function useAddCheckmarkMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addCheckmarkMutation = useMutation(
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
        queryClient.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = queryClient.getQueryData('checkmarks');

        // Optimistically add new checkmark
        queryClient.setQueryData('checkmarks', (old) => [...old, checkmark]);

        // Return a context object with the snapshotted value
        return { previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        queryClient.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('checkmarks'),
    }
  );

  return addCheckmarkMutation;
}

/**
 * Returns a function that fetches user checkmarks
 */
export function useFetchCheckmarks() {
  const { db } = useFirebase();
  const { user } = useAuth();

  /**
   * Fetches checkmarks all the user's checkmarks from the database.
   */
  const fetchCheckmarks = () => {
    // Get all the user's checkmarks from the database
    return db
      .ref(`checkmarks/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let checkmarks = [];

        if (snapshot.exists()) {
          // Iterate over each checkmark to get its ID and values
          snapshot.forEach((child) => {
            checkmarks.push({
              id: child.key,
              ...child.val(),
            });
          });
        }

        return checkmarks;
      });
  };

  return fetchCheckmarks;
}

/**
 * Use checkmarks hook
 *
 * Returns a react-query query, that fetches the checkmarks using `fetchCheckmark`
 */
export function useCheckmarksQuery() {
  const fetchCheckmarks = useFetchCheckmarks();

  const checkmarksQuery = useQuery('checkmarks', fetchCheckmarks, {
    initialData: [],
    initialStale: true,
  });

  return checkmarksQuery;
}

/**
 * Use delete checkmark hook
 *
 * Returns a react-query mutation that deletes a checkmark.
 * The mutation has to be called with checkmark id.
 *
 */
export function useDeleteCheckmarkMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteCheckmarkMutation = useMutation(
    (checkmarkId) => {
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${checkmarkId}`);
      // Remove the checkmark in the database
      return checkmarkRef.set(null).then(() => checkmarkId);
    },
    {
      // When mutate is called:
      onMutate: (checkmarkId) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryClient.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = queryClient.getQueryData('checkmarks');

        // Optimistically remove the checkmark from queryClient
        queryClient.setQueryData('checkmarks', (old) =>
          old.filter((checkmark) => checkmark.id !== checkmarkId)
        );

        // Return a context object with the snapshotted value
        return { previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, checkmarkId, context) => {
        queryClient.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('checkmarks'),
    }
  );

  return deleteCheckmarkMutation;
}

/**
 * Use update checkmark value hook
 *
 * Returns a react-query mutation, that updates the checkmark value.
 * The mutation has to be called with checkmark object.
 */
export function useUpdateCheckmarkMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updateCheckmarkMutation = useMutation(
    (checkmark) => {
      // Get checkmark database ref
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${checkmark.id}`);

      // Update checkmark value in the database
      return checkmarkRef
        .update({
          value: checkmark.value,
        })
        .then(() => checkmark);
    },
    {
      // When mutate is called:
      onMutate: (newCheckmark) => {
        // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
        queryClient.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousCheckmarks = queryClient.getQueryData('checkmarks');

        // Optimistically update to the new checkmark value
        queryClient.setQueryData('checkmarks', (old) =>
          old.map((checkmark) => {
            if (checkmark.id === newCheckmark.id) {
              return {
                ...checkmark,
                ...newCheckmark,
              };
            } else {
              return checkmark;
            }
          })
        );

        // Return a context object with the snapshotted value
        return { previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        queryClient.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => queryClient.invalidateQueries('checkmarks'),
    }
  );

  return updateCheckmarkMutation;
}

export function useUpdateCheckmarkInDbMutate() {
  const addCheckmark = useAddCheckmarkMutation();
  const updateCheckmark = useUpdateCheckmarkMutation();
  const deleteCheckmark = useDeleteCheckmarkMutation();

  const updateCheckmarkInDbMutation = ({
    checkmarkId,
    habitId,
    value,
    date,
  }) => {
    // Checkmark id is falsy so the checkmark doesn't exists.
    // A new checkmark should be added.
    const shouldAdd = !checkmarkId;

    // Checkmark id is truthy so the checkmark already exists.
    // A value to be set is not `EMPTY` so the checkmark should be updated.
    const shouldUpdate = !!checkmarkId && value !== EMPTY;

    // Checkmark id is truthy so the checkmark already exists.
    // A value to be set is `EMPTY` so the checkmark should be deleted.
    const shouldDelete = !!checkmarkId && value === EMPTY;

    // Update
    if (shouldUpdate) {
      return updateCheckmark.mutate({ id: checkmarkId, value });

      // Delete
    } else if (shouldDelete) {
      return deleteCheckmark.mutate(checkmarkId);

      // Add
    } else if (shouldAdd) {
      return addCheckmark.mutate({ habitId, date, value });
    } else {
      throw new Error(
        'Unhandled case when updating the checkmark in the database.'
      );
    }
  };

  return updateCheckmarkInDbMutation;
}
