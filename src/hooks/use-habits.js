import { useEffect, useState } from 'react';

import { useFirebase } from 'services/firebase';

export function useHabits() {
  const { db, user } = useFirebase();

  const [habits, setHabits] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let _isMounted = true;

    setStatus('pending');

    db
      .ref('habits')
      .orderByChild('user')
      .equalTo(user.uid)
      .on(
        'value',
        snapshot => {
          // Update habits only if there was a value in database
          if (!snapshot.exists()) return;

          let fetchedHabits = snapshot.val();

          // Fetched habits is an object so we need to convert it to an array
          fetchedHabits = Object.entries(fetchedHabits).map(([id, habit]) => ({
            id,
            ...habit,
          }));

          if (_isMounted) {
            setHabits(fetchedHabits);
            setStatus('resolved');
          }
        },
        error => {
          console.log('Error when fetching habits', error);

          if (_isMounted) {
            setStatus('error');
            setError(error);
          }
        }
      );

    return () => {
      _isMounted = false;
    };
  }, [db, user]);

  const isLoading = status === 'idle' || status === 'pending';
  const isError = status === 'error';

  return { habits, setHabits, status, error, isLoading, isError };
}
