import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useQuery } from 'react-query';

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
