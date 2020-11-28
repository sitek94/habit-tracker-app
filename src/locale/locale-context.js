import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { enGB, enUS, es, pl } from 'date-fns/locale';
import { startOfWeek, format, addDays } from 'date-fns';
import { ReactComponent as UnitedStatesFlagSvg } from 'icons/united-states.svg';
import { ReactComponent as UnitedKingdomFlagSvg } from 'icons/united-kingdom.svg';
import { ReactComponent as PolandFlagSvg } from 'icons/poland.svg';
import { ReactComponent as SpainFlagSvg } from 'icons/spain.svg';
import LocalizaitonProvider, {
  MuiPickersAdapterContext,
} from '@material-ui/lab/LocalizationProvider';

// Defaukt locale
const defaultLocale = enUS;

// Available locales
export const locales = [
  { code: 'es', label: 'Español', icon: <SpainFlagSvg />, import: es },
  {
    code: 'en-US',
    label: 'English US',
    icon: <UnitedStatesFlagSvg />,
    import: enUS,
  },
  {
    code: 'en-GB',
    label: 'English GB',
    icon: <UnitedKingdomFlagSvg />,
    import: enGB,
  },
  { code: 'pl', label: 'Polski', icon: <PolandFlagSvg />, import: pl },
];

// Locale provider
function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(defaultLocale);

  /**
   * Changes the locale that is available through LocaleProvider
   */
  const changeLocale = React.useCallback((locale) => {
    setLocale(locale);
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

  /**
   * Creates extended locale object with helper methods and properties
   */
  const createExtendedLocale = React.useCallback(
    (locale) => {
      return {
        ...locale,

        weekdays,
        changeLocale,
      };
    },
    [changeLocale, weekdays]
  );

  const extendedLocale = createExtendedLocale(locale);

  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns} locale={extendedLocale}>
      {children}
    </LocalizaitonProvider>
  );
}

function useLocale() {
  const context = React.useContext(MuiPickersAdapterContext);
  if (context === undefined) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }
  return context.locale;
}

export { LocaleProvider, useLocale };
