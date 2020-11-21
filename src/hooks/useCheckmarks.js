import { useAuth } from 'context/auth-context';
import { useFirebase } from 'context/firebase-context';
import { useQuery } from 'react-query';

export function useCheckmarks() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return useQuery('checkmarks', () =>
    db
      .ref(`checkmarks/${user.uid}`)
      .once('value')
      .then(snapshot => {
        let habits = null;

        if (snapshot.exists()) {
          // snapshot.forEach(child => {
          //   habits({
          //     id: child.key,
          //     checkmarks: {
          //       ...child.val()
          //     }
          //   })
          // });
          habits = snapshot.val();
        }


        return habits;
      })
  );
}
