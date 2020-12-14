import * as React from 'react';
import { Incognito as IncognitoIcon } from 'mdi-material-ui';
import { AuthProviderButton } from './auth-providers-list';
import { useTheme } from '@material-ui/core';
import { useTranslation } from 'translations';
import { blueGrey } from '@material-ui/core/colors';


function SignInAsGuestButton(props) {
  const { palette } = useTheme();
  const t = useTranslation();

  return (
    <AuthProviderButton
      providerColor={blueGrey[800]}      
      startIcon={<IncognitoIcon />}
      variant={palette.mode === 'dark' ? 'contained' : 'outlined'}
      fullWidth
      {...props}
    >
      {t('signInAsGuest')}
    </AuthProviderButton>
  )
}

export { SignInAsGuestButton }