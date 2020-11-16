import { useEffect, useState } from 'react';

import { useFirebase } from 'services/firebase';

export function useCheckmarksData() {
  const { db, user } = useFirebase();

  const [checkmarks, setCheckmarks] = useState({});
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let _isMounted = true;

    setStatus('pending');

    db.ref(`checkmarks/${user.uid}`).on(
      'value',
      snapshot => {
        let fetchedCheckmarks = {};

        if (snapshot.exists()) {
          fetchedCheckmarks = snapshot.val();
        }

        if (_isMounted) {
          setStatus('resolved');
          setCheckmarks(fetchedCheckmarks);
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
