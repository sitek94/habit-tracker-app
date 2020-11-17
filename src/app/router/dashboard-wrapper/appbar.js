import PropTypes from 'prop-types';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar as MuiAppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';

// Drawer width
import { DRAWER_WIDTH } from './drawer';
import { useFirebase } from 'services/firebase';

// Styles
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: {
    // keep right padding when drawer closed
    paddingRight: 24,
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));

// Appbar
function AppBar({ isShifted, onMenuClick }) {
  const classes = useStyles();

  const { user } = useFirebase();
  const isAuthorized = Boolean(user);

  return (
    <MuiAppBar
      position="absolute"
      className={clsx(classes.appBar, isShifted && isAuthorized && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        {isAuthorized && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            className={clsx(
              classes.menuButton,
              isShifted && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Habit Tracking App
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  // Properties
  isShifted: PropTypes.bool.isRequired,

  // Event handlers
  onMenuClick: PropTypes.func.isRequired,
};

export default AppBar;
