import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

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
 * Updates user's locale code in the database
 */
export function useUpdateLocaleCode() {
  const { user } = useAuth();
  const { db } = useFirebase();

  return (newLocaleCode) => {
    return db.ref(`users/${user.uid}/locale/code`).set(newLocaleCode);
  };
}

