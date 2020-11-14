import { useEffect, useState } from 'react';
import { useFirebase } from 'services/firebase';

import { EMPTY } from 'data/constants';
import { getNextCheckmarkValue } from 'helpers';

export function useCheckmarkValue(habitId, date) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [value, setValue] = useState(EMPTY);

  const { db, user } = useFirebase();

  // Initial fetch of the checkmark value
  useEffect(() => {
    let _isMounted = true;

    async function fetchValue() {
      setStatus('pending');

      try {
        const snapshot = await db
          .ref(`checkmarks/${user.uid}/${habitId}/${date}`)
          .once('value');

        let fetchedValue = EMPTY;
        
        if (snapshot.exists()) {
          // Update there is data in the database
          fetchedValue = snapshot.val();
        }

        if (_isMounted) {
          setValue(fetchedValue);
          setStatus('resolved');
        }
      } catch (error) {
        console.log('Error when fetching checkmark value', error);

        if (_isMounted) {
          setStatus('error');
          setError(error);
        }
      }
    }

    fetchValue();

    return () => {
      _isMounted = false;
    }
  }, [db, user, date, habitId]);

  // Updates the value of the checkmark to the next value
  const updateValue = async () => {
    setStatus('pending');

    try {
      const checkmarkRef = db.ref(`checkmarks/${user.uid}/${habitId}/${date}`);
      const nextValue = getNextCheckmarkValue(value);
      
      // When user sets a checkmark back to `empty` we remove the checkmark in the database
      if (nextValue === EMPTY) {
        await checkmarkRef.remove();
      } else {
        await checkmarkRef.set(nextValue);
      }

      setStatus('resolved');
      setValue(nextValue);
    } catch (error) {
      setStatus('error');

      console.log('Error when updating the checkmark value', error);
    }
  }

  return { status, error, value, updateValue };
}
