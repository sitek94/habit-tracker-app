import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { AppBar, Box, Button, ButtonGroup, Toolbar } from '@material-ui/core';
import { useFirebase } from 'services/firebase';

import LandingPage from 'pages/landing';
import SignInPage from 'pages/sign-in';
import SignUpPage from 'pages/sign-up';
import { Content } from 'layout';

function PublicWrapper() {
  const { path } = useRouteMatch();
  const { user } = useFirebase();

  console.log(user);

  return (
    <>
      <AppBar position="absolute">
        <Toolbar>
          <Box flexGrow={1}>
            <Button component={Link} to="/" color="inherit">
              Habit Tracker
            </Button>
          </Box>

          <ButtonGroup variant="outlined" color="inherit">
            <Button component={Link} to="/signin">
              Login
            </Button>

            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      <Content>
        <Switch>
          <Route path={path} exact>
            <LandingPage />
          </Route>

          <Route path="/signin">
            {user ? <Redirect to="/dashboard" /> : <SignInPage />}
          </Route>

          <Route path="/signup" exact>
            {user ? <Redirect to="/dashboard" /> : <SignUpPage />}
          </Route>
        </Switch>
      </Content>
    </>
  );
}

export default PublicWrapper;
