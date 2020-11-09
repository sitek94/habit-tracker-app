import { useEffect, useState } from 'react';

import { useFirebase } from 'features/firebase';

function useHabitsData() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { database, db, user } = useFirebase();

  useEffect(() => {
    // const query =  db
    //   .collection('habits')
    //   .where('uid', '==', user.uid)

    // const observer = query.onSnapshot(querySnapshot => {
    //   console.log(`Received query snapshot of size ${querySnapshot.size}`);
    //   querySnapshot.docs.forEach(doc => 
    //     console.log(doc.data()));
    //   // ...
    // }, err => {
    //   console.log(`Encountered error: ${err}`);
    // });
 // A post entry.
    let uid = 132131;

    var postData = {
      author: 'Maciek',
      uid,
      habits: ['adsa', 'dsadsa', 'dsadsa']
    };

    var newPostKey = database.ref().child('posts').push().key;
    
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;

    database.ref().update(updates).then(d => console.log(d));

   
  }, [database, user])

  // useEffect(() => {
  //   let _isMounted = true;

  //   const fetchHabits = async () => {
  //     setIsLoading(true);
  //     setIsError(false);

  //     try {
  //       const habitsRef = await db.collection('habits');
  //       const snapshot = await habitsRef.where('uid', '==', user.uid).get();

  //       if (snapshot.empty) {
  //         console.log(`User doesn't have any habits yet.`);
  //         return;
  //       }

  //       let fetchedHabits = [];

  //       snapshot.forEach(doc => {
  //         const habit = doc.data();

  //         fetchedHabits.push({
  //           id: doc.id,
  //           ...habit
  //         });
  //       });

  //       if (_isMounted) {
  //         setHabits(fetchedHabits);
  //       }
  //     } catch (error) {
  //       if (_isMounted) {
  //         setIsError(true);
  //       }
  //     } finally {
  //       if (_isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };

  //   fetchHabits();

  //   return () => {
  //     _isMounted = false;
  //   }
  // }, [db, user]);

  return [{ habits, isLoading, isError }, setHabits];
}

export default useHabitsData;
