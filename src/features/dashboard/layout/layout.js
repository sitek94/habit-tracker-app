import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, makeStyles } from '@material-ui/core';

import AppBar from './appbar';
import Drawer from './drawer';

// Drawer width
export const DRAWER_WIDTH = 240;

// Styles
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

  padding: {
    padding: theme.spacing(2),
  },
}));

// Layout
function Layout({ children }) {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar isShifted={isDrawerOpen} onMenuClick={openDrawer} />
      <Drawer isOpen={isDrawerOpen} onArrowClick={closeDrawer} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout;
