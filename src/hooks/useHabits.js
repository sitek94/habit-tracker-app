import { useFirebase } from 'context/firebase-context';
import { useQuery } from 'react-query';

export function useHabits() {
  const { db } = useFirebase();

  return useQuery('habits', () =>
    db
      .ref('maciek/habits')
      .once('value')
      .then(snapshot => {
        let fetchedHabits = [];
        
        if (snapshot.exists()) {
          snapshot.forEach(childSnapshot => {
            fetchedHabits.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
        }

        return fetchedHabits;
      })
  );
}