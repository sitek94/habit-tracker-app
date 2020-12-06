import * as React from 'react';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import {
  Drawer,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

// Drawer width
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

// Sidebar link
function SidebarLink({ icon, children, ...rest }) {
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
function SidebarButton({ icon, children, ...rest }) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.drawerItem} {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

// Sidebar
function Sidebar({ isOpen, onToggle, children }) {
  const classes = useStyles();

  return (
    <>
      {/* Small screens */}
      <Hidden smUp implementation="js">
        <Drawer
          anchor="left"
          variant="temporary"
          open={isOpen}
          onClose={onToggle}
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {children}
        </Drawer>
      </Hidden>

      {/* Desktop screens */}
      <Hidden smDown implementation="js">
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
    </>
  );
}

export { Sidebar, SidebarButton, SidebarLink };
