import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { addDays, format, startOfWeek } from 'date-fns';
import { locales, defaultLocale } from './locales';
import { useUserData } from 'context/user-config-context';

/**
 * User Locale Provider provides the locale when user is authenticated. The locale is automatically
 * updated when user's data changes.
 */
function UserLocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(defaultLocale);

  const { locale: userLocale } = useUserData();

  // Update the locale whenever user's data changes
  React.useEffect(() => {
    // Find locale by its code
    const newLocale = locales.find((locale) => locale.code === userLocale.code)
      .import;

    // Check if user has changed the first day of the week
    if (userLocale.weekStartsOn) {
      newLocale.options.weekStartsOn = userLocale.weekStartsOn;
    }

    setLocale(newLocale);
  }, [userLocale]);

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

  const extendedLocale = {
    // Locale object
    ...locale,
    setLocale,

    // Additional properties
    weekdays,
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={extendedLocale}>
      {children}
    </LocalizationProvider>
  );
}

export { UserLocaleProvider };
