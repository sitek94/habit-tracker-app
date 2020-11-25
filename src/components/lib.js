import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as BugFixingSvg } from 'images/bug-fixing.svg';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { ReactComponent as VisualDataSvg } from 'images/visual-data.svg';
import { ReactComponent as HeatmapDataSvg } from 'images/heatmap-data.svg';
import { ReactComponent as PiechartSvg } from 'images/piechart.svg';

const useButtonProgressStyles = makeStyles((theme) => ({
  buttonProgress: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: theme.shape.borderRadius,
    opacity: 0.5,
  },
}));

function ButtonProgress(props) {
  const classes = useButtonProgressStyles();

  return <LinearProgress className={classes.buttonProgress} {...props} />;
}

function ErrorMessage({ error, inline, ...sx }) {
  const display = inline ? 'inline' : 'block';

  return (
    <Box
      sx={{
        color: 'error.main',
        display: 'inline',
        ...sx,
      }}
    >
      <span role="alert">There was an error</span>
      <Box
        component="pre"
        sx={{
          display: 'inline',
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
FullPageErrorFallback.propTypes = {
  error: PropTypes.object.isRequired,
};

// Barchart placeholder
function BarchartPlaceholder(props) {
  return <VisualDataSvg height="100%" width="100%" />;
}

function HeatmapPlaceholder(props) {
  return <HeatmapDataSvg height="100%" width="100%" />;
}

function PieChartPlaceholder(props) {
  return <PiechartSvg height="100%" width="100%" />;
}

export {
  BarchartPlaceholder,
  ButtonProgress,
  ErrorMessage,
  HeatmapPlaceholder,
  PieChartPlaceholder,
  FullPageSpinner,
  FullPageErrorFallback,
};
