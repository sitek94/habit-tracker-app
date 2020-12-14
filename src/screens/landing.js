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
    <Box sx={{ textAlign: 'center' }}>
      <QuoteBox>
        <Quote>
          <FaQuoteLeft /> {t('landingQuoteFirstLine')}
          <br />
          {t('landingQuoteSecondLine')}
        </Quote>

        <Author>&mdash; John Dryden</Author>
      </QuoteBox>

      <GetStartedButton>{t('getStarted')}</GetStartedButton>
    </Box>
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
        background: `
          linear-gradient(
            to right bottom, 
            ${alpha(lightRgb, 0.3)}, 
            ${alpha(darkRgb, 0.8)}), 
          url(${hero})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {children}
    </Box>
  );
}

function QuoteBox({ children }) {
  return (
    <Box
      sx={{
        textAlign: 'right',
        color: 'common.white',
        mb: { xs: 1, sm: 0 },
      }}
    >
      {children}
    </Box>
  );
}

function Quote({ children }) {
  return (
    <Box
      clone
      sx={{
        textAlign: 'center',
        whiteSpace: { xs: 'initial', sm: 'nowrap' },
        maxWidth: { xs: 295, sm: 'none' },
        fontSize: { xs: '2.5rem', sm: '2rem', md: '3rem' },
      }}
    >
      <Typography variant="h2" component="p">
        {children}
      </Typography>
    </Box>
  );
}

function Author({ children }) {
  return (
    <Box
      sx={{
        fontWeight: 'light',
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
  return (
    <Box
      clone
      sx={{
        backgroundColor: 'common.white',
        color: 'primary.main',
        fontWeight: 'bold',
      }}
    >
      <Fab to="/signup" component={RouterLink} variant="extended" {...props} />
    </Box>
  );
}

export { LandingScreen };
