import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, Navigate, Route, Routes } from 'react-router-dom';
import {
  AppBar,
  ButtonGroup,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { FullPageImageBackground, LandingScreen } from 'screens/landing';
import { ResetPasswordScreen } from 'screens/reset-password';
import { SignInScreen } from 'screens/sign-in';
import { SignUpScreen } from 'screens/sign-up';
import { LocaleSelect } from 'components/locale-select';
import { useTranslation } from 'translations';
import { GithubRepoLink } from 'components/github-repo-link';
import { DarkModeSwitch } from 'components/dark-mode-switch';

const useStyles = makeStyles((theme) => ({
  // App
  container: {
    height: '100vh',
    width: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Nav
  toolbar: {
    justifyContent: 'flex-end',
  },
  title: {
    marginRight: 'auto',
    textTransform: 'none',
  },

  // Button group
  buttonGroup: {
    marginLeft: 12,
  },
}));

// App
function UnathenticatedApp() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Nav />
      <main className={classes.content}>
        <FullPageImageBackground>
          <AppRoutes />
        </FullPageImageBackground>
      </main>
    </div>
  );
}

// Nav link
function NavButton(props) {
  return (
    <Button
      component={RouterLink}
      color="primary"
      disableElevation
      {...props}
    />
  );
}

// Navigation
function Nav() {
  const t = useTranslation();
  const classes = useStyles();

  return (
    <AppBar color="inherit" position="absolute">
      <Toolbar className={classes.toolbar}>
        <NavButton to="/" className={classes.title}>
          <Typography variant="h6">Habit Tracker</Typography>
        </NavButton>

        <DarkModeSwitch color="primary" />

        <GithubRepoLink color="primary" />

        <LocaleSelect />

        <ButtonGroup
          variant="outlined"
          color="primary"
          className={classes.buttonGroup}
        >
          <NavButton to="/signin">{t('signIn')}</NavButton>
          <NavButton to="/signup">{t('signUp')}</NavButton>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

// Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default UnathenticatedApp;
