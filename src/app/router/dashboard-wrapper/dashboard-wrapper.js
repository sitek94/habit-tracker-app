import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import { CheckmarksProvider, HabitsProvider } from 'context';
import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { Content } from 'layout';
import AddHabitPage from 'pages/add-habit';
import CockpitPage from 'pages/dashboard';
import EditHabitPage from 'pages/edit-habit';
import ManageHabitsPage from 'pages/manage-habits';
import { useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useFirebase } from 'services/firebase';
import AppBar from './appbar';
import Drawer, { ListItemButton, ListItemLink } from './drawer';

// Dashboard wrapper
function DashboardWrapper() {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { user, auth } = useFirebase();
  const { openDialog, closeDialog } = useDialog();
  const { openSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSignOutClick = () => {
    // Open dialog to get user confirmation if they want to sign out
    openDialog({
      title: 'Sign out?',
      contentText:
        'While signed out you are unable to manage your profile and conduct other activities that require you to be signed in.',
      actions: (
        <>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Close the dialog and invoke the sign out function
              closeDialog();
              signOut();
            }}
            color="primary"
            variant="contained"
            autoFocus
          >
            Sign out
          </Button>
        </>
      ),
    });
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await auth.signOut();

      setIsLoading(false);
      openSnackbar('success', 'Signed out!');

      history.push('/');
    } catch ({ message }) {
      setIsLoading(false);
      openSnackbar('error', message);
    }
  };

  if (!user) {
    return <h1>No user</h1>
  }

  return (
    <CheckmarksProvider>
      <HabitsProvider>
        <AppBar isShifted={isDrawerOpen} onMenuClick={openDrawer} />
        <Drawer
          mainListItems={[]}
          secondaryListItems={
            <>
              <ListItemLink
                primary="Dashboard"
                to={`${url}/add-habit`}
                icon={<DashboardIcon />}
              />
              <ListItemLink
                primary="Add habit"
                to={`${url}/add-habit`}
                icon={<AddIcon />}
              />
              <ListItemLink
                primary="Manage habits"
                to={`${url}/manage-habits`}
                icon={<ListIcon />}
              />
              <ListItemButton
                primary="Sign out"
                onClick={handleSignOutClick}
                icon={<ExitIcon />}
              />
            </>
          }
          isOpen={isDrawerOpen}
          onArrowClick={closeDrawer}
        />
        <Content>
          <Switch>
            <Route exact path={path}>
              <CockpitPage />
            </Route>

            <Route exact path={`${path}/add-habit`}>
              <AddHabitPage />
            </Route>

            <Route exact path={`${path}/manage-habits`}>
              <ManageHabitsPage />
            </Route>

            <Route exact path={`${path}/edit-habit/:habitId`}>
              <EditHabitPage />
            </Route>
          </Switch>
        </Content>
      </HabitsProvider>
    </CheckmarksProvider>
  );
}

export default DashboardWrapper;
