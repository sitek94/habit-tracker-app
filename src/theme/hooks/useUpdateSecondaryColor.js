import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { getColor } from './colors';

/**
 * Updates user's secondary color in the database
 */
function useUpdateSecondaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newSecondaryColor) => {
    newSecondaryColor = getColor(newSecondaryColor);

    return db
      .ref(`users/${user.uid}/theme/secondaryColor`)
      .update(newSecondaryColor.id);
  };
}

export { useUpdateSecondaryColor };
