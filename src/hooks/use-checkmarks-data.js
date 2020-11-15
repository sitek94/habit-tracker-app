import { useEffect, useState } from 'react';

import { useFirebase } from 'services/firebase';
import { SKIPPED } from 'data/constants';

export function useCheckmarksData() {
  const { db, user } = useFirebase();

  const [checkmarks, setCheckmarks] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let _isMounted = true;

    setStatus('pending');

    db.ref(`checkmarks/${user.uid}`).on(
      'value',
      snapshot => {
        let checkmarks = [];

        if (snapshot.exists()) {
          let dataObject = snapshot.val();

          // Convert object fetched from database to array
          Object.entries(dataObject).forEach(([habitId, habitCheckmarks]) => {

            // Convert habit checkmarks from object to an array
            let habitCheckmarksArray = [];

            Object.entries(habitCheckmarks).forEach(([day, value]) => {

              // Skipped days are not included in visualization because they're skipped :O
              // It might be changed in the future but at the moment I'm not sure what could
              // be a good way to visualize that.
              if (value !== SKIPPED) {
                habitCheckmarksArray.push({ day, value });
              }
            });

            checkmarks.push({
              id: habitId,
              checkmarks: habitCheckmarksArray,
            })
          });
        }

        if (_isMounted) {
          setStatus('resolved');
          setCheckmarks(checkmarks);
        }
      },
      error => {
        console.log('Error when fetching checkmarks', error);

        if (_isMounted) {
          setError(error);
          setStatus('error');
        }
      }
    );

    return () => {
      _isMounted = false;
    };
  }, [db, user]);

  const isLoading = status === 'idle' || status === 'pending';
  const isError = status === 'error';

  return { checkmarks, status, error, isLoading, isError };
}
