import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { addDays, format, startOfWeek } from 'date-fns';
import { defaultLocale, locales } from './locales';

/**
 * Locale provider
 */
function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(defaultLocale);

  /**
   * Updates locale by locale's code
   */
  const setLocaleByCode = React.useCallback(
    (newLocaleCode) => {
    // Find locale by its code
    const newLocale = locales.find((locale) => locale.code === newLocaleCode);

    if (newLocale) {
      // Update locale with newLocale's imported object
      setLocale(newLocale.import);
    } else {
      throw new Error(`Unhandled locale code provided: ${newLocaleCode}`);
    }
  }, []);

  /**
   * Array of weekdays, starting on the first day of the week
   * as specified in the locale
   */
  const weekdays = React.useMemo(() => {
    const firstDayOfWeek = startOfWeek(new Date(), { locale });

    return Array.from(Array(7)).map((_, i) =>
      format(addDays(firstDayOfWeek, i), 'eeee', { locale })
    );
  }, [locale]);

  const localeValue = {
     // Theme object has to be spread here so that it properties can be accessed directly.
    ...locale,

    // Additional properties
    weekdays,
    setLocaleByCode,
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeValue}>
      {children}
    </LocalizationProvider>
  );
}

export { LocaleProvider };
