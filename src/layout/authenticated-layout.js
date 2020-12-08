import * as React from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';
import { Link as RouterLink, useMatch } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
} from '@material-ui/core';

const LayoutContext = React.createContext();

/**
 * Layout
 */

function Layout({ children }) {
  // Open/close drawer
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const onDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const context = {
    isDrawerOpen,
    onDrawerToggle,
  };

  return (
    <LayoutContext.Provider value={context}>
      <CssBaseline />
      <Box sx={{ height: '100vh', display: 'flex' }}>{children}</Box>
    </LayoutContext.Provider>
  );
}

/**
 * Content
 */

function Content({ children }) {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

/**
 * Navbar
 */

const useNavbarStyles = makeStyles((theme) => ({
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

function Navbar({ onMenuClick, children }) {
  const classes = useNavbarStyles();

  const { onDrawerToggle } = React.useContext(LayoutContext);

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

/**
 * Sidebar
 */

// Drawer width
const DRAWER_WIDTH = 240;

const useSidebarStyles = makeStyles((theme) => ({
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

function Sidebar({ children }) {
  const classes = useSidebarStyles();

  const { isDrawerOpen, onDrawerToggle } = React.useContext(LayoutContext);

  return (
    <>
      {/* Small screens */}
      <Hidden lgUp implementation="js">
        <Drawer
          anchor="left"
          variant="temporary"
          open={isDrawerOpen}
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
        </Drawer>
      </Hidden>

      {/* Desktop screens */}
      <Hidden lgDown implementation="js">
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

// Sidebar link
function SidebarLink({ icon, children, ...rest }) {
  const classes = useSidebarStyles();
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
  const classes = useSidebarStyles();

  return (
    <ListItem button className={classes.drawerItem} {...rest}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{children}</ListItemText>
    </ListItem>
  );
}

export { Layout, Navbar, Sidebar, SidebarLink, SidebarButton, Content };
