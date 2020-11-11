import { useEffect, useState } from 'react';

import { useFirebase } from 'services/firebase';

export const useHabits = () => {
  const { db, user } = useFirebase();

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchHabits = async () => {
      setIsLoading(true);

      try {
        setIsError(false);

        const snapshot = await db
          .ref('habits')
          .orderByChild('user')
          .equalTo(user.uid)
          .once('value');

        let fetchedHabits = snapshot.val();

        // User doesn't have any habits
        if (!fetchedHabits) {
          return;
        }

        // Fetched habits is an object so we need to convert it to an array
        fetchedHabits = Object.entries(fetchedHabits).map(([id, habit]) => ({
          id,
          ...habit,
        }));

        setHabits(fetchedHabits);
      } catch (error) {
        console.log(error);

        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [db, user]);

  return [{habits, isLoading, isError}, setHabits];
}