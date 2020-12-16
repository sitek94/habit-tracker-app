import * as React from 'react';
import { Link as RouterLink, Navigate, Route, Routes } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  useTheme,
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon,
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon,
  GitHub as GitHubIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons';
import {
  MobileMenu,
  MobileMenuItem,
  MobileMenuProvider,
  MobileMenuToggler,
} from 'components/mobile-menu';

import { Copyright } from 'components/copyright';
import { LocaleSelect } from 'components/locale-select';
import { LandingScreen } from 'screens/landing';
import { ResetPasswordScreen } from 'screens/reset-password';
import { SignInScreen } from 'screens/sign-in';
import { SignUpScreen } from 'screens/sign-up';
import { useTranslation } from 'translations';
import { AppTitle } from './app-title';
import { Footer } from './footer';
import { Layout } from './layout';
import { MainContent } from './main-content';
import { Navbar, NavbarStartItem } from './navbar';

const githubProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
  href: process.env.REACT_APP_GITHUB_LINK,
};

const iconButtonProps = {
  edge: 'start',
  color: 'inherit',
};

/**
 * Version of the app when user is not authenticated.
 */
function UnathenticatedApp() {
  const t = useTranslation();
  const { palette, toggleDarkMode } = useTheme();

  // Dark mode
  const darkModeLabel = t('darkModeSwitch');
  const darkModeIcon = palette.mode === 'light' ? <MoonIcon /> : <SunIcon />;

  // Github
  const githubLabel = t('githubRepo');

  return (
    <Layout>
      {/* Navbar */}
      <MobileMenuProvider>
        <Navbar>
          <NavbarStartItem>
            <AppTitle />
          </NavbarStartItem>

          {/* Screens larger than `xs` */}
          <Hidden smDown>
            {/* Locale select */}
            <LocaleSelect />

            {/* Dark mode switch */}
            <Tooltip title={darkModeLabel}>
              <IconButton
                aria-label={darkModeLabel}
                onClick={toggleDarkMode}
                {...iconButtonProps}
              >
                {darkModeIcon}
              </IconButton>
            </Tooltip>

            {/* Github repo link */}
            <Tooltip title={githubLabel}>
              <IconButton
                aria-label={githubLabel}
                {...iconButtonProps}
                {...githubProps}
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>

            {/* Sign in/up */}
            <ButtonGroup variant="outlined" color="inherit">
              <Button component={RouterLink} to="/signin">
                {t('signIn')}
              </Button>
              <Button component={RouterLink} to="/signup">
                {t('signUp')}
              </Button>
            </ButtonGroup>
          </Hidden>

          <Hidden smUp>
            {/* Toggle mobile menu */}
            <MobileMenuToggler />
          </Hidden>
        </Navbar>
        <MobileMenu>
          {/* Sign in */}
          <MobileMenuItem component={RouterLink} to="signin">
            <IconButton edge="start">
              <AccountCircleIcon />
            </IconButton>
            <p>{t('signIn')}</p>
          </MobileMenuItem>

          {/* Sign up */}
          <MobileMenuItem component={RouterLink} to="signup">
            <IconButton edge="start">
              <PersonAddIcon />
            </IconButton>
            <p>{t('signUp')}</p>
          </MobileMenuItem>

          {/* Github repo link */}
          <MobileMenuItem>
            <IconButton edge="start">
              <GitHubIcon />
            </IconButton>
            <p>{githubLabel}</p>
          </MobileMenuItem>

          {/* Locale select */}
          <LocaleSelect variant="item" />

          {/* Dark mode switch */}
          <MobileMenuItem onClick={toggleDarkMode}>
            <IconButton edge="start">{darkModeIcon}</IconButton>
            <p>{t('darkModeSwitch')}</p>
          </MobileMenuItem>
        </MobileMenu>
      </MobileMenuProvider>

      {/* Main content */}
      <MainContent>
        {/* Offset for navbar */}
        <Toolbar />

        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUpScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainContent>

      {/* Footer */}
      <Footer>
        <Copyright />
      </Footer>
    </Layout>
  );
}

export { UnathenticatedApp };
