import * as React from 'react';
import { AppBar, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useDrawer } from './drawer-context';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'flex-end',
  },
  menuButton: {
    // Push other menu elements to the right
    marginRight: 'auto',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

function Navbar({ children }) {
  const classes = useStyles();

  const { onDrawerToggle } = useDrawer();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        {children}
      </Toolbar>
    </AppBar>
  );
}

export { Navbar };
