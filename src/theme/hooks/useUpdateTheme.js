import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { getColor } from './colors';

/**
 * Updates user theme in the database
 */
function useUpdateTheme() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newTheme) => {
    let primaryColor = newTheme.primaryColor;
    let secondaryColor = newTheme.secondaryColor;
    let dark = newTheme.dark;

    primaryColor = getColor(primaryColor);
    secondaryColor = getColor(secondaryColor);

    return db.ref(`users/${user.uid}/theme`).set({
      primaryColor: primaryColor.id,
      secondaryColor: secondaryColor.id,
      dark: dark,
    });
  };
}

export { useUpdateTheme };
