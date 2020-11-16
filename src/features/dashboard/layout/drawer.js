import PropTypes from 'prop-types';
import clsx from 'clsx';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
  Drawer as MuiDrawer,
  Divider,
  IconButton,
  List,
  makeStyles,
} from '@material-ui/core';

// Drawer width
import { DRAWER_WIDTH } from './layout';

// Styles
const useDrawerStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));

// Drawer
function Drawer({ isOpen, onArrowClick }) {
  const classes = useDrawerStyles();

  return (
    <MuiDrawer
      variant="permanent"
      open={isOpen}
      classes={{
        paper: clsx(classes.drawerPaper, !isOpen && classes.drawerPaperClose),
      }}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onArrowClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>TO BE</List>
      <Divider />
      <List>TO BE</List>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  // Properties
  isOpen: PropTypes.bool.isRequired,

  // Event handlers
  onArrowClick: PropTypes.func.isRequired,
};

export default Drawer;
