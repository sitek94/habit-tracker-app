import { createMuiTheme } from '@material-ui/core';
import { getColor } from './colors';

// Get constant variables
const defaultPrimaryColor = getColor(process.env.REACT_APP_THEME_PRIMARY_COLOR);
const defaultSecondaryColor = getColor(
  process.env.REACT_APP_THEME_SECONDARY_COLOR
);
const defaultDark = process.env.REACT_APP_THEME_DARK === 'true';

export const defaultThemeConstants = {
  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
  dark: defaultDark,
}

// Create default theme
export const defaultTheme = createMuiTheme({
  palette: {
    primary: defaultPrimaryColor.import,
    secondary: defaultSecondaryColor.import,
    mode: defaultDark ? 'dark' : 'light',
  },

  // Extend default mui theme with some helpers
  ...defaultThemeConstants,
});

/**
 * Checks if passed `theme` is matches `defaultTheme`
 */
export function isDefaultTheme(theme) {
  if (!theme) {
    return false;
  }

  if (
    theme.primaryColor.id === defaultPrimaryColor.id &&
    theme.secondaryColor.id === defaultSecondaryColor.id &&
    theme.dark === defaultDark
  ) {
    return true;
  }

  return false;
};

/**
 * Creates extended Material-UI Theme.
 * + primaryColor object
 * + secondaryColor object
 * + dark boolean
 */
export function createTheme(theme) {
  if (!theme) {
    return null;
  }

  let primaryColor = theme.primaryColor;
  let secondaryColor = theme.secondaryColor;
  let dark = theme.dark;

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  primaryColor = getColor(primaryColor);
  secondaryColor = getColor(secondaryColor);

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  theme = createMuiTheme({
    palette: {
      primary: primaryColor.import,
      secondary: secondaryColor.import,
      mode: dark ? 'dark' : 'light',
    },

    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    dark: dark,
  });

  return theme;
}
