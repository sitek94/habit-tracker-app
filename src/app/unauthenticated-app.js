import * as React from 'react';
import Button from '@material-ui/core/Button';
import { Link as RouterLink, Navigate, Route, Routes } from 'react-router-dom';
import {
  AccountCircle as AccountCircleIcon,
  PersonAdd as PersonAddIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons';
import {
  AppBar,
  ButtonGroup,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { FullPageImageBackground, LandingScreen } from 'screens/landing';
import { ResetPasswordScreen } from 'screens/reset-password';
import { SignInScreen } from 'screens/sign-in';
import { SignUpScreen } from 'screens/sign-up';
import { LocaleSelect } from 'components/locale-select';
import { useTranslation } from 'translations';
import { GithubRepoLink } from 'components/github-repo-link';
import { DarkModeSwitch } from 'components/dark-mode-switch';

const useStyles = makeStyles((theme) => ({
  // App
  container: {
    height: '100vh',
    width: '100%',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Nav
  toolbar: {
    justifyContent: 'flex-end',
    color: theme.palette.text.primary,
  },
  title: {
    marginRight: 'auto',
    textTransform: 'none',
  },

  // Button group
  buttonGroup: {
    marginLeft: 12,
  },
}));

// App
function UnathenticatedApp() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Nav />
      <main className={classes.content}>
        <FullPageImageBackground>
          <AppRoutes />
        </FullPageImageBackground>
      </main>
    </div>
  );
}

// Nav link
function NavButton(props) {
  return (
    <Button
      component={RouterLink}
      color="inherit"
      disableElevation
      {...props}
    />
  );
}

// Navigation
function Nav() {
  const t = useTranslation();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="inherit" position="absolute">
        <Toolbar className={classes.toolbar}>
          <NavButton to="/" className={classes.title}>
            <Typography variant="h6">Habit Tracker</Typography>
          </NavButton>

          {/* Desktop only */}
          <Hidden smDown>
            <LocaleSelect />

            <DarkModeSwitch color="inherit" />

            <GithubRepoLink color="inherit" />

            <ButtonGroup
              variant="outlined"
              color="inherit"
              className={classes.buttonGroup}
            >
              <NavButton to="/signin">{t('signIn')}</NavButton>
              <NavButton to="/signup">{t('signUp')}</NavButton>
            </ButtonGroup>
          </Hidden>

          {/* Mobile menu toggler */}
          <Hidden smUp>
            <IconButton
              aria-label="show more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMenuClick}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>

      {/* Mobile popup menu */}
      <Menu
        anchorEl={anchorEl}
        id="mobile-menu"
        keepMounted
        open={isMenuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={RouterLink} to="signin">
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
          <p>{t('signIn')}</p>
        </MenuItem>

        <MenuItem onClick={handleClose} component={RouterLink} to="signup">
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <p>{t('signUp')}</p>
        </MenuItem>

        <GithubRepoLink variant="item" color="inherit" />

        <LocaleSelect variant="item" />

        <DarkModeSwitch variant="item" color="inherit" />
      </Menu>
    </>
  );
}

// Routes
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingScreen />} />
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/reset-password" element={<ResetPasswordScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default UnathenticatedApp;
