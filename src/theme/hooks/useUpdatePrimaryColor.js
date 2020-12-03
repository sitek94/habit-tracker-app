import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { getColor } from './colors';

/**
 * Updates user's primary color in the database
 */
function useUpdatePrimaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newPrimaryColor) => {
    newPrimaryColor = getColor(newPrimaryColor);

    return db
      .ref(`users/${user.uid}/theme/primaryColor`)
      .update(newPrimaryColor.id);
  };
}

export { useUpdatePrimaryColor };
