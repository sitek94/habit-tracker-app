import { useEffect, useState } from 'react';

import { useFirebase } from 'services/firebase';

export function useHabits() {
  const { db, user } = useFirebase();

  const [habits, setHabits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHabits = async () => {
      setStatus('pending');

      try {
        const snapshot = await db
          .ref('habits')
          .orderByChild('user')
          .equalTo(user.uid)
          .once('value');

        // Update habits only if there was a value in database
        if (snapshot.exists()) {
          let fetchedHabits = snapshot.val();

          // Fetched habits is an object so we need to convert it to an array
          fetchedHabits = Object.entries(fetchedHabits).map(([id, habit]) => ({
            id,
            ...habit,
          }));

          setHabits(fetchedHabits);
        }

        setStatus('resolved');
      } catch (error) {
        console.log('Error when fetching habits', error);

        setStatus('error');
        setError(error);
      }
    };

    fetchHabits();
  }, [db, user]);

  const isLoading = status === 'idle' || status === 'pending';
  const isError = status === 'error';

  return { habits, setHabits, status, error, isLoading, isError };
}
