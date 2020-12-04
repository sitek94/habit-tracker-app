import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useQueryCache, useQuery, useMutation } from 'react-query';

/**
 * Use add habit hook
 * 
 * @returns a react-query mutation that adds a new habit to the database.
 * The mutation takes as an argument a new habit object.
 */
export function useAddHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
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
      onSuccess: () => cache.invalidateQueries('habits'),
    }
  );
}

/**
 * Use delete habit hook
 * 
 * @returns a react-query mutation that deletes the habit and all the checkmarks
 * associated with it from the database.
 * 
 * The mutation takes as an argument habit id.
 */
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

/**
 * Use fetch habit by id hook
 * 
 * @returns a function that fetches a habit by id from the database.
 */
export function useFetchHabitById() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (key, { id }) => {
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
}

/**
 * Use habit by id hook
 * 
 * @param {string} habitId
 * 
 * @returns a react-query query that fetches the habit by id, using `fetchHabitById`
 */
export function useHabitById(habitId) {
  const fetchHabitById = useFetchHabitById();

  return useQuery(habitId && ['habit', { id: habitId }], fetchHabitById, {
    enabled: habitId !== null,
  });
}

/**
 * Use habits hook
 * 
 * @returns react-query query for that fetches all the user's habits from
 * the database.
 */
export function useHabits() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useQuery('habits', () => {
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
}

/**
 * Use update habit hook
 * 
 * @returns a react-query mutation that updates the habit in the database.
 * The mutation takes as an argument habit object.
 */
export function useUpdateHabit() {
  const { db } = useFirebase();
  const { user } = useAuth();
  const cache = useQueryCache();

  return useMutation(
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
        const previousHabit = cache.getQueryData(['habit', { id: habit.id }]);

        // Snapshot previous values
        cache.setQueryData(['habit', { id: habit.id }], (old) => ({
          ...old,
          ...habit,
        }));

        // Return a context object with the snapshotted value
        return { previousHabit };
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (error, newCheckmark, context) => {
        cache.setQueryData('habits', context.previousCheckmarks);
      },
      // Always refetch after error or success:
      onSuccess: async (habit) => {
        cache.refetchQueries('habits');
        await cache.refetchQueries(['habit', { id: habit.id }]);
      },
    }
  );
}
