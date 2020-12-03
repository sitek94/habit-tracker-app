import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

/**
 * Removes user's theme in the database
 */
function useRemoveTheme() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return () => {
    return db.ref(`users/${user.uid}/theme`).remove();
  };
}

export { useRemoveTheme };
