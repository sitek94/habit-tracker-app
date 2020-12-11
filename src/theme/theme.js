import { createMuiTheme } from '@material-ui/core';
import { getColor } from './colors';

// Get constant variables
const defaultPrimaryColor = getColor(process.env.REACT_APP_THEME_PRIMARY_COLOR);
const defaultSecondaryColor = getColor(
  process.env.REACT_APP_THEME_SECONDARY_COLOR
);
const defaultDark = process.env.REACT_APP_THEME_DARK === 'true';

/**
 * Default theme constants
 *
 * For primary and secondary color their id and for dark a boolean.
 */
export const defaultThemeConstants = {
  primaryColor: defaultPrimaryColor.id,
  secondaryColor: defaultSecondaryColor.id,
  dark: defaultDark,
};

/**
 * Create default theme
 * 
 * Creates a theme using `createMuiTheme` that uses default values for 
 * primary and secondary color.
 * 
 * @param {boolean} darkMode specify if dark mode should be used
 */
export function createDefaultTheme(mode) {
  return createMuiTheme({
    palette: {
      primary: defaultPrimaryColor.import,
      secondary: defaultSecondaryColor.import,
      mode,
    },

    // Extend default mui theme with additional properties
    ...defaultThemeConstants,
  });
}

/**
 * Default theme
 */
export const defaultTheme = createDefaultTheme(defaultDark === true ? 'dark' : 'light');


/**
 * Is default theme?
 *
 * Checks whether passed `theme` matches `defaultTheme`.
 *
 * @returns {boolean} true/false
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
}

/**
 * Create theme
 *
 * @returns extended material-ui theme. Additional properties:
 *  - `primaryColor` object
 *  - `secondaryColor` object
 *  - `dark` boolean
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

    // Additional properties
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    dark: dark,
  });

  return theme;
}
