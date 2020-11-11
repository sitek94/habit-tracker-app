import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { useFirebase } from 'services/firebase';
import { useDialog } from 'components/dialog/dialog-context';
import { useSnackbar } from 'components/snackbar';

const Navbar = () => {
  const history = useHistory();

  const { user, auth } = useFirebase();

  const [isLoading, setIsLoading] = useState();

  const { openDialog, closeDialog } = useDialog();
  const { openSnackbar } = useSnackbar();

  const handleSignOutClick = () => {
    // Open dialog to get user confirmation if they want to sign out
    openDialog({
      title: 'Sign out?',
      contentText:
        'While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.',
      actions: (
        <>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Close the dialog and invoke the sign out function
              closeDialog();
              signOut();
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Sign out
          </Button>
        </>
      ),
    });
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await auth.signOut();

      setIsLoading(false);
      openSnackbar('success', 'Signed out!');

      history.push('/');
    } catch ({ message }) {
      setIsLoading(false);
      openSnackbar('error', message);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box flexGrow={1}>
          {user && <Typography variant="h6">Hello, {user.email}</Typography>}

          {!user && (
            <Button component={Link} to="/" color="inherit" disabled={isLoading}>
              Habit Tracker
            </Button>
          )}
        </Box>

        {!user && (
          <ButtonGroup variant="outlined" color="inherit" disabled={isLoading}>
            <Button component={Link} to="/signin">
              Login
            </Button>

            <Button component={Link} to="/signup">
              Sign up
            </Button>
          </ButtonGroup>
        )}

        {user && (
          <>
            <Button
              component={Link}
              to="/dashboard/add-habit"
              color="inherit"
              disabled={isLoading}
            >
              Create habit
            </Button>

            <Button component={Link} to="/dashboard" color="inherit" disabled={isLoading}>
              Dashboard
            </Button>

            <Button component={Link} to="/dashboard/habits" color="inherit" disabled={isLoading}>
              All habits
            </Button>

            <Button color="inherit" onClick={handleSignOutClick} disabled={isLoading}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
