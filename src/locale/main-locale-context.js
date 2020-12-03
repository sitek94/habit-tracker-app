import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { defaultLocale } from './locales';

/**
 * Main Locale Provider is used to expose locale object when the user is
 * not authorized.
 */
function MainLocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(defaultLocale);

  const extendedLocale = {
    // Locale
    ...locale,

    // Setter
    setLocale
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={extendedLocale}>
      {children}
    </LocalizationProvider>
  );
}

export { MainLocaleProvider };
