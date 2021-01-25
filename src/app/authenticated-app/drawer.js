import * as React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import {
  Drawer as MuiDrawer,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useDrawer } from './drawer-context';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  drawerItem: {
    paddingLeft: theme.spacing(3),
  },
}));

function Drawer({ children }) {
  const classes = useStyles();

  const { isDrawerOpen, closeDrawer, onDrawerToggle } = useDrawer();

  return (
    <>
      {/* Small screens */}
      <Hidden lgUp implementation="js">
        <MuiDrawer
          anchor="left"
          variant="temporary"
          open={isDrawerOpen}
          onClick={closeDrawer}
          onClose={onDrawerToggle}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            // Prevents adding padding right to the body
            disableScrollLock: true,
            // Better open performance on mobile.
            keepMounted: true,
          }}
        >
          {children}
        </MuiDrawer>
      </Hidden>

      {/* Desktop screens */}
      <Hidden lgDown implementation="js">
        <MuiDrawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </MuiDrawer>
      </Hidden>
    </>
  );
}

// Sidebar link
function DrawerLink({ icon, children, ...rest }) {
  const classes = useStyles();
  const match = useMatch(rest.to);

  return (
    <ListItem
      button
      selected={Boolean(match)}
      component={RouterLink}
      className={classes.drawerItem}
      {...rest}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

// Sidebar button
function DrawerButton({ icon, children, ...rest }) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.drawerItem} {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

export { Drawer, DrawerLink, DrawerButton };
