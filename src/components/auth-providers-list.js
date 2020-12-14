import * as React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
  useTheme,
} from '@material-ui/core/styles';
import authProviders from 'data/auth-providers';

const useStyles = makeStyles((theme) => ({
  // Button
  root: {
    justifyContent: 'flex-start',
    textTransform: 'none',
  },
  icon: {
    padding: theme.spacing(0, 2),
  },
}));

function AuthProviderButton({ providerColor, ...props }) {
  const classes = useStyles();

  // Create a theme with primary color set to corresponding auth provider color
  const providerTheme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: providerColor,
          },
        },
      }),
    [providerColor]
  );

  return (
    <ThemeProvider theme={providerTheme}>
      <Button
        classes={{
          root: classes.root,
          startIcon: classes.icon,
        }}
        {...props}
      />
    </ThemeProvider>
  );
}

function AuthProviderList({ text, disabled, onAuthProviderClick }) {
  const { palette } = useTheme();

  return authProviders.map(({ id, name, color, icon, scopes }) => (
    <AuthProviderButton
      key={id}
      providerColor={color}
      onClick={(event) => onAuthProviderClick(event, { id, scopes })}
      disabled={disabled}
      startIcon={icon}
      variant={palette.mode === 'dark' ? 'contained' : 'outlined'}
      fullWidth
    >
      {text} {name}
    </AuthProviderButton>
  ));
}

AuthProviderList.defaultProps = {
  disabled: false,
};

AuthProviderList.propTypes = {
  // Properties
  text: PropTypes.string,
  disabled: PropTypes.bool,

  // Events
  onAuthProviderClick: PropTypes.func.isRequired,
};

export { AuthProviderList, AuthProviderButton };
