import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { useQueryClient } from 'react-query';

/**
 * Use update performance goal hook
 *
 * @returns a function that updates user's performance goal in the database.
 * The function takes as an argument a new performance goal value.
 */
export function useUpdatePerformanceGoal() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newPerformanceGoal) => {
    return db.ref(`users/${user.uid}/performanceGoal`).set(newPerformanceGoal);
  };
}

/**
 * Use update locale code hook
 *
 * @returns a function that updates user's locale code in the database.
 * The function takes as an argument new locale code.
 */
export function useUpdateLocaleCode() {
  const { user } = useAuth();
  const { db } = useFirebase();

  return (newLocaleCode) => {
    return db.ref(`users/${user.uid}/locale/code`).set(newLocaleCode);
  };
}

/**
 * Use delete user data hook
 *
 * @returns a function that deletes user's data. It deletes user's data,
 * habits and checkmarks.
 */
export function useDeleteUserData() {
  const { user } = useAuth();
  const { db } = useFirebase();
  const queryClient = useQueryClient();

  return () => {
    const updates = {};

    updates[`habits/${user.uid}`] = null;
    updates[`checkmarks/${user.uid}`] = null;
    updates[`users/${user.uid}`] = null;

    return db.ref().update(updates).then(() => {
      queryClient.invalidateQueries();
    });
  };
}

/**
 * Returns a function that updates the user data in the database.
 */
export function useUpdateUserData() {
  const { user } = useAuth();
  const { db } = useFirebase();

  /**
   * Updates the user data in the database.
   * 
   * @param { {checkmarks: string[]} }
   */
  const updateUserData = ({ checkmarks, habits, settings }) => {
    const updates = {};

    if (checkmarks) updates[`checkmarks/${user.uid}`] = checkmarks;
    if (habits) updates[`habits/${user.uid}`] = habits;
    if (settings) updates[`users/${user.uid}`] = settings;

    return db.ref().update(updates);
  };

  return updateUserData;
}
