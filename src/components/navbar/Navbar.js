import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { AppBar, Box, Button, ButtonGroup, Toolbar, Typography } from '@material-ui/core';

import { FirebaseContext } from 'api/firebase-context';

const Navbar = () => {
  const history = useHistory();
  const { user, auth } = useContext(FirebaseContext);

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();

      console.log('Successfully logged out!');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar>
      <Toolbar>
        <Box flexGrow={1}>
          {user && <Typography variant="h6">Hello, {user.email}</Typography>}

          {!user && (
            <Button component={Link} to="/" color="inherit">
              Habit Tracker
            </Button>
          )}
        </Box>

        {user && (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        )}

        {!user && (
          <ButtonGroup variant="outlined" color="inherit">
            <Button component={Link} to="/signin">
              Login
            </Button>

            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </ButtonGroup>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
