import * as React from 'react';
import { MuiPickersAdapterContext } from '@material-ui/lab/LocalizationProvider';

function useLocale() {
  const context = React.useContext(MuiPickersAdapterContext);
  if (context === undefined) {
    throw new Error(`useLocale must be used within a LocaleProvider`);
  }
  return context.locale;
}

export { useLocale };
