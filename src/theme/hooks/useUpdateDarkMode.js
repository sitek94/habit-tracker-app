import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';

/**
 * Updates user's dark mode in the database
 */
function useUpdateDarkMode() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (darkMode) => {
    return db.ref(`users/${user.uid}/theme/dark`).set(darkMode);
  };
}

export { useUpdateDarkMode };
