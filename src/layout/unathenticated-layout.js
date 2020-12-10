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
import { useTranslation } from 'translations';



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

      <main className={classes.content}>
  
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


  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
   

      </Toolbar>
    </AppBar>
  );
}



export default UnathenticatedApp;
