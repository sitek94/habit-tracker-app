import * as React from 'react';
import { useTranslation } from 'translations';
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
import { Divider, List, Toolbar, Typography } from '@material-ui/core';
import {
  Add as AddIcon,
  Dashboard as DashboardIcon,
  ExitToApp as ExitIcon,
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
import { GithubRepoLink } from 'components/github-repo-link';

// Translations
const translations = {
  addHabit: {
    pl: 'Dodaj nawyk',
    es: 'Agregar hábito',
    en: 'Add habit',
  },
  manageHabits: {
    pl: 'Edytuj nawyki',
    es: 'Editar hábitos',
    en: 'Manage habits',
  },
  settings: {
    pl: 'Ustawienia',
    es: 'Configuración',
    en: 'Settings',
  },
  logout: {
    pl: 'Wyloguj',
    es: 'Cerrar sesión',
    en: 'Logout',
  },
};

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

  const updateLocaleCode = useUpdateLocaleCode();

  // When locale is clicked, user's data in the database is updated
  const handleLocaleClick = (clickedLocaleCode) => {
    updateLocaleCode(clickedLocaleCode);
  };

  const t = useTranslation(translations);

  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <Layout>
        {/* Navbar */}
        <Navbar>
          <LocaleSelect onLocaleClick={handleLocaleClick} />
          <GithubRepoLink />
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
              {t('addHabit')}
            </SidebarLink>

            <SidebarLink to="/manage-habits" icon={<ListIcon />}>
              {t('manageHabits')}
            </SidebarLink>
          </List>
          <Divider />
          <List>
            <SidebarLink to="/settings" icon={<SettingsIcon />}>
              {t('settings')}
            </SidebarLink>
            <SidebarButton onClick={handleLogoutClick} icon={<ExitIcon />}>
              {t('logout')}
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
