import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Drawer width
export const DRAWER_WIDTH = 240;

const useListItemStyles = makeStyles(theme => ({
  paddingLeft: {
    paddingLeft: theme.spacing(3),
  },
}));

export function ListItemLink({ icon, primary, to }) {
  const classes = useListItemStyles();

  const CustomLink = useMemo(
    () =>
      forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  );

  return (
    <ListItem button component={CustomLink} className={classes.paddingLeft}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
}

export function ListItemButton({ icon, primary, onClick }) {
  const classes = useListItemStyles();

  return (
    <ListItem button onClick={onClick} className={classes.paddingLeft}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
}

// Styles
const useDrawerStyles = makeStyles(theme => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeIn,
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
function Drawer({ isOpen, onArrowClick, mainListItems, secondaryListItems }) {
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
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems}</List>
    </MuiDrawer>
  );
}

Drawer.propTypes = {
  // Properties
  isOpen: PropTypes.bool.isRequired,
  mainListItems: PropTypes.node,
  secondaryListItems: PropTypes.node,

  // Event handlers
  onArrowClick: PropTypes.func.isRequired,
};

export default Drawer;
