import { useEffect, useState } from 'react';
import { useFirebase } from 'services/firebase';

import { EMPTY } from 'data/constants';
import { getNextCheckmarkValue } from 'helpers';

export function useCheckmarkValue(habitId, date) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [value, setValue] = useState(EMPTY);

  const { db } = useFirebase();

  useEffect(() => {
    async function fetchValue() {
      setStatus('pending');

      try {
        const snapshot = await db
          .ref(`habitCheckmarks/${habitId}/${date}`)
          .once('value');

        setStatus('resolved');

        if (snapshot.exists()) {
          // Update there is data in the database
          setValue(snapshot.val());
        }
      } catch (error) {
        setStatus('error');
        setError(error);

        console.log('Error when fetching checkmark value', error);
      }
    }

    fetchValue();
  }, [db, date, habitId]);

  const updateValue = async () => {
    setStatus('pending');

    try {
      const checkmarkRef = db.ref(`habitCheckmarks/${habitId}/${date}`);
      const nextValue = getNextCheckmarkValue(value);

      // When user sets a checkmark back to `empty` we remove the checkmark in the database
      if (value === 0) {
        await checkmarkRef.remove();
      } else {
        await checkmarkRef.set(value);
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
