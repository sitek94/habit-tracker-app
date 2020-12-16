import * as React from 'react';
import { AppBar, Box, Button, Toolbar } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Navbar wrapper
 */
function Navbar({ children }) {
  return (
    <AppBar color="inherit" position="absolute">
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
}

/**
 * Uses `margin-rigth: auto` to push other elements to the right.
 */
function NavbarStartItem({ children }) {
  return <Box sx={{ marginRight: 'auto' }}>{children}</Box>;
}

/**
 * `MuiButton` with `RouterLink` as component
 */
function NavbarRouterLink(props) {
  return (
    <Button
      component={RouterLink}
      color="inherit"
      disableElevation
      {...props}
    />
  );
}

export { Navbar, NavbarStartItem, NavbarRouterLink };
