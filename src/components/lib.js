import { makeStyles } from '@material-ui/core/styles';
import { ReactComponent as BugFixingSvg } from 'images/bug-fixing.svg';
import {
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from '@material-ui/core';

const useButtonProgressStyles = makeStyles(theme => ({
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

function FullPageSpinner() {
  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress size={150} />
    </Box>
  );
}

function FullPageErrorFallback({ error }) {
  return (
    <Box
      role="alert"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box clone width="50%" height="50%" margin={2}>
        <BugFixingSvg />
      </Box>

      <Box margin={2}>
        <Typography variant="h5">
          Uh oh... There's a problem. Try refreshing the app.
        </Typography>
      </Box>

      <Box margin={2}>
        <Typography variant="body1">{error.message}</Typography>
      </Box>
    </Box>
  );
}

export { ButtonProgress, FullPageSpinner, FullPageErrorFallback };