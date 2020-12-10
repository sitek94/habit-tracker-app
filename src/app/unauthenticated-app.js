import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, Route, Routes } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { LandingScreen } from 'screens/landing';
import { ResetPasswordScreen } from 'screens/reset-password';
import { SignInScreen } from 'screens/sign-in';
import { SignUpScreen } from 'screens/sign-up';
import { LocaleSelect } from 'components/locale-select';
import { useLocale } from 'localization';
import { locales } from 'localization';

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
    flex: 1,
  },
}));

// App
function UnathenticatedApp() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Nav />
      <main className={classes.content}>
        <AppRoutes />
      </main>
    </div>
  );
}

// Nav link
function NavLink(props) {
  return <Button component={RouterLink} color="inherit" {...props} />;
}

// Navigation
function Nav() {
  const classes = useStyles();

  const { code, setLocale } = useLocale();

  // Handle clicking on locale
  const handleLocaleClick = (clickedLocaleCode) => {
    const clickedLocale = locales.find(locale => locale.code === clickedLocaleCode);

    setLocale(clickedLocale.import);
  }

  // Currently selected locale object
  const selectedLocale = locales.find(locale => locale.code === code);

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Habit Tracker
        </Typography>

        <NavLink to="/home">Home</NavLink>
        <LocaleSelect selectedLocale={selectedLocale} onLocaleClick={handleLocaleClick} />
        <NavLink to="/signin">Sign in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </Toolbar>
    </AppBar>
  );
}

// Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<LandingScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
    </Routes>
  );
}

export default UnathenticatedApp;
