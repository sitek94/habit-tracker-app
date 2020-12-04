import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { getColor } from 'theme';

/**
 * Use update theme hook
 * 
 * @returns a function that updates user's theme in the database.
 * The function takes as an argument new theme object.
 */
export function useUpdateTheme() {
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

/**
 * Use update primary color hook
 * 
 * @returns a function that updates user's primary color in the database.
 * The function takes as an argument new primary color object.
 */
export function useUpdatePrimaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newPrimaryColor) => {
    newPrimaryColor = getColor(newPrimaryColor);

    return db
      .ref(`users/${user.uid}/theme/primaryColor`)
      .set(newPrimaryColor.id);
  };
}

/**
 * Use update secondary color hook
 * 
 * @returns a function that updates user's secondary color in the database.
 * The function takes as an argument new secondary color object.
 */
export function useUpdateSecondaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newSecondaryColor) => {
    newSecondaryColor = getColor(newSecondaryColor);

    return db
      .ref(`users/${user.uid}/theme/secondaryColor`)
      .set(newSecondaryColor.id);
  };
}

/**
 * Use update dark mode hook
 * 
 * @returns a function that updates user's dark mode settings in the database.
 * The function takes as an argument new dark mode value (boolean).
 */
export function useUpdateDarkMode() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (darkMode) => {
    return db.ref(`users/${user.uid}/theme/dark`).set(darkMode);
  };
}

/**
 * Use remove theme hook
 * 
 * @returns a function that removes user's theme settings in the database.
 */
export function useRemoveTheme() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return () => {
    return db.ref(`users/${user.uid}/theme`).remove();
  };
}

