import { useFirebase } from 'context/firebase-context';
import { useAuth } from 'context/auth-context';
import { getColor } from './colors';

/**
 * Returns a function that updates user theme
 */
export function useUpdateUserTheme() {
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
 * Returns a function that updates user's primary color
 */
export function useUpdateUserPrimaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newPrimaryColor) => {
    newPrimaryColor = getColor(newPrimaryColor);

    return db
      .ref(`users/${user.uid}/theme/primaryColor`)
      .update(newPrimaryColor.id);
  };
}

/**
 * Returns a function that updates user's secondary color
 */
export function useUpdateSecondaryColor() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (newSecondaryColor) => {
    newSecondaryColor = getColor(newSecondaryColor);

    return db
      .ref(`users/${user.uid}/theme/secondaryColor`)
      .update(newSecondaryColor.id);
  };
}

/**
 * Returns a function that updates user's dark mode
 */
export function useUpdateUserDarkMode() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return (darkMode) => {
    return db.ref(`users/${user.uid}/theme/dark`).set(darkMode);
  };
}

/**
 * Returns a function that removes user's theme
 */
export function useRemoveUserTheme() {
  const { db } = useFirebase();
  const { user } = useAuth();

  return () => {
    return db.ref(`users/${user.uid}/theme`).remove();
  };
}

