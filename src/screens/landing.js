import {
  Box,
  Fab,
  hexToRgb,
  alpha,
  Typography,
  useTheme,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'translations';
import hero from 'images/hero.jpg';

function LandingScreen() {
  const t = useTranslation();

  return (
    // <FullPageImageBackground>
    <CenteredBox>
      <QuoteBox>
        <Quote>
          <FaQuoteLeft /> {t('landingQuoteFirstLine')}
          <br />
          {t('landingQuoteSecondLine')}
        </Quote>

        <Author>&mdash; John Dryden</Author>
      </QuoteBox>

      <GetStartedButton>{t('getStarted')}</GetStartedButton>
    </CenteredBox>
  );
}

export function FullPageImageBackground({ children }) {
  const { light, dark } = useTheme().palette.primary;

  const lightRgb = hexToRgb(light);
  const darkRgb = hexToRgb(dark);

  return (
    <Box
      sx={{
        // Background image
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        background: `
          linear-gradient(
            to right bottom, 
            ${alpha(lightRgb, 0.3)}, 
            ${alpha(darkRgb, 0.8)}), 
          url(${hero})`,
      }}
    >
      {children}
    </Box>
  );
}

function CenteredBox({ children }) {
  return (
    <Box
      sx={{
        // Centered box
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function QuoteBox({ children }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        textAlign: 'right',
        color: theme.palette.common.white,
      }}
    >
      {children}
    </Box>
  );
}

function Quote({ children }) {
  return (
    <Typography variant="h2" component="p" align="center" noWrap>
      {children}
    </Typography>
  );
}

function Author({ children }) {
  return (
    <Box
      sx={{
        fontWeight: 300,
        fontStyle: 'italic',
      }}
      clone
    >
      <Typography variant="h5" component="span">
        {children}
      </Typography>
    </Box>
  );
}

function GetStartedButton(props) {
  const theme = useTheme();

  return (
    <Box
      clone
      sx={{
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightBold,
      }}
    >
      <Fab
        to="/signup"
        component={RouterLink}
        variant="extended"
        {...props}
      />
    </Box>
  );
}

export { LandingScreen };
