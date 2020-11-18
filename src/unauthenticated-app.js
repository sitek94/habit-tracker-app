import * as React from 'react';

import { Routes, Route, Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
// import LandingPage from 'pages/landing';
import SignInForm from 'components/sign-in-form';
import SignUpForm from 'components/sign-up-form';
// import SignUpPage from 'pages/sign-up';
import { LandingPage } from 'components/lib';

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function UnathenticatedApp() {
  const classes = useStyles();

  return (
    <div>
      <Nav />

      <main className={classes.content}>
        <Toolbar />
        <Container maxWidth="lg">
          <AppRoutes />
        </Container>
      </main>
    </div>
  );
}

function NavLink(props) {
  return <Button component={RouterLink} color="inherit" {...props} />;
}

function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="absolute">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.title}>
          Habit Tracker
        </Typography>

        <NavLink to="/home">Home</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
        <NavLink to="/signup">Sign up</NavLink>
      </Toolbar>
    </AppBar>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<LandingPage />} />
      <Route path="/signin" element={<SignInForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default UnathenticatedApp;
