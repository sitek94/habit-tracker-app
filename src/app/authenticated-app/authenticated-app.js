import * as React from 'react';
import { useQueryClient } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';
import { Divider, List, Toolbar, Typography } from '@material-ui/core';
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitIcon,
  List as ListIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';

import * as guestData from 'data/guest';

import { AddHabitScreen } from 'screens/add-habit';
import { DashboardScreen } from 'screens/dashboard';
import { EditHabitScreen } from 'screens/edit-habit';
import { ManageHabitsScreen } from 'screens/manage-habits';
import { NotFoundScreen } from 'screens/not-found';
import { UserSettingsScreen } from 'screens/user-settings';

import { FullPageErrorFallback, ErrorFallback } from 'components/lib';
import { LocaleSelect } from 'components/locale-select';
import { GithubRepoLink } from 'components/github-repo-link';

import { useTranslation } from 'translations';
import { useAuth } from 'context/auth-context';
import { useDialog } from 'context/dialog-context';
import {
  useUpdateLocaleCode,
  useUpdateUserData,
  useDeleteUserData,
} from 'api/user-data';

import { Drawer, DrawerButton, DrawerLink } from './drawer';
import { Layout } from './layout';
import { Navbar } from './navbar';
import { MainContent } from './main-content';

/**
 * Authenticated App
 */
function AuthenticatedApp() {
  const queryClient = useQueryClient();
  const { user, signOut } = useAuth();
  const { openDialog } = useDialog();
  const t = useTranslation();

  const deleteUserData = useDeleteUserData();
  const updateUserData = useUpdateUserData();

  /**
   * Initializing the data when user is Anonymous
   *
   * When user logs in as guest we provide him with some dummy data. This data
   * is immediately stored in the cache and updated in user's data point in the database.
   *
   * This will be handy when creating an account by linking this anonymous account.
   */
  React.useEffect(() => {
    /**
     * Check if user is anonymous and if they have habits and checkmarks in the cache.
     * If they've already have the data in cache it means that it has already been initialized
     * and there is no need to do it again.
     */
    if (user.isAnonymous) {
      const { habits, dbHabits, checkmarks, dbCheckmarks } = guestData;

      // Set data in the cache
      queryClient.setQueryData('habits', habits);
      queryClient.setQueryData('checkmarks', checkmarks);

      // Set data in the database
      updateUserData({
        habits: dbHabits,
        checkmarks: dbCheckmarks,
      });
    }
    // Run ONLY on initial mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logout click handler
  const handleLogoutClick = () => {
    openDialog({
      title: t('signOutQuestion'),
      description: t('signOutDescription'),
      confirmText: t('signOutConfirm'),
      onConfirm: async () => {
        try {
          // When signing out and user is anonymous, delete their data
          if (user.isAnonymous) {
            await deleteUserData();
            await signOut();
          } else {
            await signOut();
          }
        } catch (error) {
          console.log(error, error.message);
        }
      },
      color: 'secondary',
    });
  };

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
          <LocaleSelect onLocaleClick={handleLocaleClick} />
          <GithubRepoLink color="inherit" />
        </Navbar>

        {/* Drawer */}
        <Drawer>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Habit tracker
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            <DrawerLink to="/dashboard" icon={<DashboardIcon />}>
              Dashboard
            </DrawerLink>

            <DrawerLink to="/add-habit" icon={<AddIcon />}>
              {t('addHabit')}
            </DrawerLink>

            <DrawerLink to="/manage-habits" icon={<ListIcon />}>
              {t('manageHabits')}
            </DrawerLink>
          </List>
          <Divider />
          <List>
            <DrawerLink to="/settings" icon={<SettingsIcon />}>
              {t('settings')}
            </DrawerLink>
            <DrawerButton onClick={handleLogoutClick} icon={<ExitIcon />}>
              {t('signOut')}
            </DrawerButton>
          </List>
        </Drawer>

        {/* Content */}
        <MainContent>
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
        </MainContent>
      </Layout>
    </ErrorBoundary>
  );
}

export { AuthenticatedApp };
