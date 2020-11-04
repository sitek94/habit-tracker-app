import { useFirebase } from 'api/firebase-context';
import { useEffect, useState } from 'react';

function useHabitsData() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { db, user } = useFirebase();

  useEffect(() => {
    let _isMounted = true;

    const fetchHabits = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const habitsRef = await db.collection('habits');
        const snapshot = await habitsRef.where('uid', '==', user.uid).get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        let fetchedHabits = [];

        snapshot.forEach(doc => {
          const { uid, ...habit } = doc.data();

          fetchedHabits.push({
            id: doc.id,
            ...habit,
          });
        });

        if (_isMounted) {
          setHabits(fetchedHabits);
        }
      } catch (error) {
        if (_isMounted) {
          setIsError(true);
        }
      } finally {
        if (_isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchHabits();

    return () => {
      _isMounted = false;
    }
  }, [db, user]);

  return [habits, isLoading, isError];
}

export default useHabitsData;
