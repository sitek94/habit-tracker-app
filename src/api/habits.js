import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useQueryClient, useQuery, useMutation } from 'react-query';

/**
 * Use add habit mutation
 *
 * @returns a react-query mutation that adds a new habit to the database.
 * The mutation takes as an argument a new habit object.
 */
export function useAddHabitMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addHabitMutation = useMutation(
    (habit) => {
      const { name, description, frequency, position } = habit;

      // Get database ref for the new habit
      const newHabitRef = db.ref(`habits/${user.uid}`).push();

      // Set the habit in the database
      return newHabitRef.set({
        position,
        name,
        description,
        frequency,
        createdAt: new Date().toISOString(),
      });
    },
    {
      onSuccess: () => queryClient.invalidateQueries('habits'),
    }
  );

  return addHabitMutation;
}

/**
 * Use delete habit hook
 *
 * @returns a react-query mutation that deletes the habit and all the checkmarks
 * associated with it from the database.
 *
 * The mutation takes as an argument habit id.
 */
export function useDeleteHabitMutationMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteHabitMutation = useMutation(
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
        await queryClient.cancelQueries('habits');
        await queryClient.cancelQueries('checkmarks');

        // Snapshot previous values
        const previousHabits = queryClient.getQueryData('habits');
        const previousCheckmarks = queryClient.getQueryData('checkmarks');

        // Optimistically remove the habit from queryClient
        queryClient.setQueryData('habits', (old) =>
          old.filter((habit) => habit.id !== habitId)
        );

        // Optimistically remove the habit's checkmarks from queryClient
        queryClient.setQueryData('checkmarks', (old) =>
          old.filter((checkmark) => checkmark.habitId !== habitId)
        );

        // Return a context object with the snapshotted value
        return { previousHabits, previousCheckmarks };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, habitId, context) => {
        queryClient.setQueryData('habits', context.previousHabits);
        queryClient.setQueryData('checkmarks', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSettled: () => {
        queryClient.invalidateQueries('habits');
        queryClient.invalidateQueries('checkmarks');
      },
    }
  );

  return deleteHabitMutation;
}

/**
 * Use fetch habit by id hook
 *
 * @returns a function that fetches a habit by id from the database.
 */
export function useFetchHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();

  /**
   * Fetch habit
   *
   * @param {string} id - ID of the habit to fetch
   */
  const fetchHabit = (id) => {
    // Get habit database ref
    const habitRef = db.ref(`habits/${user.uid}/${id}`);

    // Get habit value
    return habitRef.once('value').then((snapshot) => {
      // Check if the habit's data exists
      if (snapshot.exists()) {
        // Return habit id and the rest of the values
        return {
          id,
          ...snapshot.val(),
        };
      } else {
        // If there is no data return `null`
        return null;
      }
    });
  };

  return fetchHabit;
}

/**
 * Use habit by id hook
 *
 * @param {string} habitId
 *
 * @returns a react-query query that fetches the habit by id, using `fetchHabit`
 */
export function useHabitQuery(id) {
  const fetchHabit = useFetchHabit();

  const habitQuery = useQuery(id && ['habit', id], () => fetchHabit(id), {
    enabled: id !== null,
  });

  return habitQuery;
}

/**
 * Use habits hook
 *
 * @returns react-query query for that fetches all the user's habits from
 * the database.
 */
export function useHabitsQuery() {
  const { db } = useFirebase();
  const { user } = useAuth();

  const habitsQuery = useQuery('habits', () => {
    // Get all the user's habits from the database
    return db
      .ref(`habits/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let fetchedHabits = [];

        if (snapshot.exists()) {
          // Iterate over each habit to get its ID and values
          snapshot.forEach((childSnapshot) => {
            fetchedHabits.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
        }

        return fetchedHabits;
      });
  });

  return habitsQuery;
}

/**
 * Use update habit hook
 *
 * @returns a react-query mutation that updates the habit in the database.
 * The mutation takes as an argument habit object.
 */
export function useUpdateHabitMutation() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const updateHabitMutation = useMutation(
    (habit) => {
      const { id, name, description, frequency } = habit;

      // Get checkmark database ref
      const habitRef = db.ref(`habits/${user.uid}/${id}`);

      // Update the habit in the database
      return (
        habitRef
          .update({
            name,
            description,
            frequency,
          })
          // Return the habit object so it can be used in `onMutate`, etc.
          .then(() => habit)
      );
    },
    {
      // When mutate is called:
      onMutate: (habit) => {
        const previousHabit = queryClient.getQueryData(['habit', habit.id]);

        // Snapshot previous values
        queryClient.setQueryData(['habit', habit.id], (old) => ({
          ...old,
          ...habit,
        }));

        // Return a context object with the snapshotted value
        return { previousHabit };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        queryClient.setQueryData('habits', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSuccess: async (habit) => {
        queryClient.refetchQueries('habits');
        await queryClient.refetchQueries(['habit', habit.id]);
      },
    }
  );

  return updateHabitMutation;
}
