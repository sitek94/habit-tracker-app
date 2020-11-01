import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useContext } from 'react';
import { FirebaseContext } from 'api/firebase-context';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();

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

  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Habit tracker
        </Typography>

        {user && (
          <Button color="inherit" onClick={handleLogoutClick}>
            Logout
          </Button>
        )}

        {!user && (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>

            <Button color="inherit" component={Link} to="/signup">
              Sign up
            </Button>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
