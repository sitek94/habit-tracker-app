import { useQuery } from 'react-query';
import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

export function useCheckmarks() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useQuery('checkmarks', () => {
    // Get all the user's checkmarks from the database
    return db
      .ref(`checkmarks/${user.uid}`)
      .once('value')
      .then((snapshot) => {
        let checkmarks = [];

        if (snapshot.exists()) {
          // Iterate over each checkmark to get its ID and values
          snapshot.forEach((child) => {
            checkmarks.push({
              id: child.key,
              ...child.val(),
            });
          });
        }

        return checkmarks;
      });
  });
}
