import * as React from 'react';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import GitHubIcon from '@material-ui/icons/GitHub';
import SettingsIcon from '@material-ui/icons/Settings';
import { ErrorMessage, FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { useDialog } from 'context/dialog-context';
import { ErrorBoundary } from 'react-error-boundary';
import { Link as RouterLink, Route, Routes, useMatch } from 'react-router-dom';
import { AddHabitScreen } from 'screens/add-habit';
import { DashboardScreen } from 'screens/dashboard';
import { EditHabitScreen } from 'screens/edit-habit';
import { ManageHabitsScreen } from 'screens/manage-habits';
import { NotFoundScreen } from 'screens/not-found';
import { UserSettingsScreen } from 'screens/user-settings';
import { AuthenticatedAppProviders } from 'context';
import { LocaleSelect } from 'components/locale-select';

const DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme) => ({
  // App
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
  },

  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },

  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Toolbar offset
  offset: theme.mixins.toolbar,

  // Nav
  toolbar: {
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
  },
  iconButton: {
    color: theme.palette.common.white,
  },

  // Drawer
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

function ErrorFallback({ error }) {
  return (
    <ErrorMessage
      error={error}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  );
}

// App
function AuthenticatedApp() {
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <AuthenticatedAppProviders>
        <Layout
          nav={<Nav />}
          sidebar={<Sidebar />}
          content={
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AppRoutes />
            </ErrorBoundary>
          }
        />
      </AuthenticatedAppProviders>
    </ErrorBoundary>
  );
}

// Layout
function Layout({ nav, sidebar, content }) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <div className={classes.container}>
        {nav}
        {sidebar}
        <main className={classes.main}>
          <div className={classes.offset} />
          <div className={classes.content}>{content}</div>
        </main>
      </div>
    </>
  );
}

// Nav
function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <LocaleSelect />
        <Tooltip title="GitHub repository">
          <IconButton
            target="_blank"
            label="GitHub repository"
            rel="noopener noreferrer"
            href="https://github.com/sitek94/pocket-globe-app"
            className={classes.iconButton}
          >
            <GitHubIcon color="inherit" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

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
function Sidebar() {
  const classes = useStyles();
  const { signOut } = useAuth();
  const { openDialog } = useDialog();

  const handleLogoutClick = () => {
    openDialog({
      title: 'Sign out?',
      description: `
        While signed out you are unable to manage your profile and 
        conduct other activities that require you to be signed in.`,
      confirmText: 'Sign out',
      onConfirm: signOut,
      color: 'secondary',
    });
  };

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Habit tracker
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <SidebarLink to="/dashboard" icon={<DashboardIcon />}>
          Dashboard
        </SidebarLink>

        <SidebarLink to="/add-habit" icon={<AddIcon />}>
          Add habit
        </SidebarLink>

        <SidebarLink to="/manage-habits" icon={<ListIcon />}>
          Manage habits
        </SidebarLink>
      </List>
      <Divider />
      <List>
        <SidebarLink to="/settings" icon={<SettingsIcon />}>
          Settings
        </SidebarLink>
        <SidebarButton onClick={handleLogoutClick} icon={<ExitIcon />}>
          Logout
        </SidebarButton>
      </List>
    </Drawer>
  );
}

// Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/add-habit" element={<AddHabitScreen />} />
      <Route path="/edit-habit/:habitId" element={<EditHabitScreen />} />
      <Route path="/manage-habits" element={<ManageHabitsScreen />} />
      <Route path="/settings" element={<UserSettingsScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}

export default AuthenticatedApp;
