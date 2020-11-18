import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Typography,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import { makeStyles, styled } from '@material-ui/core/styles';
import { ReactComponent as BugFixingSvg } from 'images/bug-fixing.svg';
import { ReactComponent as ProgressDataSvg } from 'images/progress-data.svg';
import { Link as RouterLink } from 'react-router-dom';

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

const GetStartedButton = () => {};

function LandingPage() {
  return (
    <Box
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box clone width="50%" height="50%" margin={2}>
        <ProgressDataSvg />
      </Box>

      <Box
        position="absolute"
        top="60%"
        left="50%"
        style={{ transform: 'translate(-50%,-50%)' }}
        margin={2}
      >
        <Fab
          to="/signup"
          component={RouterLink}
          aria-label="Get started"
          color="primary"
          variant="extended"
        >
          Get Started
        </Fab>
      </Box>
    </Box>
  );
}

const useFormDividerStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    flex: 1,
  },
  span: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 1),
  },
}));

function FormDivider() {
  const classes = useFormDividerStyles();

  return (
    <div className={classes.root}>
      <Divider className={classes.divider} />
      <span className={classes.span}>OR</span>
      <Divider className={classes.divider} />
    </div>
  );
}

const useFormStyles = makeStyles(theme => ({
  container: {
    maxWidth: 586,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6, 14),
  },
  header: {
    textAlign: 'center',
  },
  form: {
    maxWidth: 320,
  },
}));

function Form({ primary, secondary, onSubmit, children }) {
  const classes = useFormStyles();

  return (
    // <Container className={classes.container}>
    <Paper elevation={5} className={classes.container}>
      <div className={classes.header}>
        <Typography component="h1" variant="h5" gutterBottom>
          {primary}
        </Typography>
        <Typography color="textSecondary" variant="body1" gutterBottom>
          {secondary}
        </Typography>
      </div>
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Paper>
  );
}

export {
  Form,
  FormDivider,
  FullPageSpinner,
  FullPageErrorFallback,
  LandingPage,
};
