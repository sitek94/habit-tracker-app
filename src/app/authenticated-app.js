import * as React from 'react';
import { locales, useLocale } from 'locale';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { AddHabitScreen } from 'screens/add-habit';
import { DashboardScreen } from 'screens/dashboard';
import { EditHabitScreen } from 'screens/edit-habit';
import { ManageHabitsScreen } from 'screens/manage-habits';
import { NotFoundScreen } from 'screens/not-found';
import { UserSettingsScreen } from 'screens/user-settings';
import { useUpdateLocaleCode } from 'api/user-data';
import { FullPageErrorFallback, ErrorFallback } from 'components/lib';
import { LocaleSelect } from 'components/locale-select';
import { useAuth } from 'context/auth-context';
import { useDialog } from 'context/dialog-context';
import {
  Divider,
  IconButton,
  List,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitIcon,
  GitHub as GitHubIcon,
  List as ListIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import {
  Layout,
  Content,
  Navbar,
  Sidebar,
  SidebarButton,
  SidebarLink,
} from 'layout/authenticated-layout';

/**
 * Authenticated App 
 */
function AuthenticatedApp() {
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

  const { code } = useLocale();
  const selectedLocale = locales.find((locale) => locale.code === code);

  const updateLocaleCode = useUpdateLocaleCode();

  // When locale is clicked, user's data in the database is updated
  const handleLocaleClick = (clickedLocaleCode) => {
    updateLocaleCode(clickedLocaleCode);
  };

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Layout>
        {/* Navbar */}
        <Navbar>
          <LocaleSelect
            selectedLocale={selectedLocale}
            onLocaleClick={handleLocaleClick}
          />
          <Tooltip title="GitHub repository">
            <IconButton
              target="_blank"
              label="GitHub repository"
              rel="noopener noreferrer"
              href="https://github.com/sitek94/pocket-globe-app"
            >
              <GitHubIcon color="inherit" />
            </IconButton>
          </Tooltip>
        </Navbar>

        {/* Sidebar */}
        <Sidebar>
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
        </Sidebar>

        {/* Content */}
        <Content>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Routes>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/add-habit" element={<AddHabitScreen />} />
              <Route
                path="/edit-habit/:habitId"
                element={<EditHabitScreen />}
              />
              <Route path="/manage-habits" element={<ManageHabitsScreen />} />
              <Route path="/settings" element={<UserSettingsScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </ErrorBoundary>
        </Content>
      </Layout>
    </ErrorBoundary>
  );
}

export default AuthenticatedApp;
