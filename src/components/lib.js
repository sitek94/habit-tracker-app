import { Box, CircularProgress, Typography } from '@material-ui/core';
import { ReactComponent as BugFixingSvg } from 'images/bug-fixing.svg';
import PropTypes from 'prop-types';

function ErrorMessage({ error, ...sx }) {
  return (
    <Box
      sx={{
        color: 'error.main',
        display: 'block',
        ...sx,
      }}
    >
      <span role="alert">There was an error</span>
      <Box
        component="pre"
        sx={{
          display: 'block',
          margin: 0,
          mb: -5,
          whiteSpace: 'break-spaces',
        }}
      >
        {error.message}
      </Box>
    </Box>
  );
}

// Full page spinner
function FullPageSpinner() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress size={150} />
    </Box>
  );
}

// Full page error fallback
function FullPageErrorFallback({ error }) {
  return (
    <Box
      role="alert"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        clone
        sx={{
          width: '50%',
          height: '50%',
          margin: 2,
        }}
      >
        <BugFixingSvg />
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="h5">
          Uh oh... There's a problem. Try refreshing the app.
        </Typography>
      </Box>

      <Box
        sx={{
          margin: 2,
        }}
      >
        <Typography variant="body1">{error.message}</Typography>
      </Box>
    </Box>
  );
}

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

FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
};

export { ErrorFallback, FullPageSpinner, FullPageErrorFallback };
