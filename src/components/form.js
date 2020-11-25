import {
  Button,
  Divider,
  Typography,
  FormHelperText,
  makeStyles,
  Box,
  Paper,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonProgress } from 'components/lib';

const useStyles = makeStyles((theme) => ({
  // Container
  paper: {
    maxWidth: 550,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  // Form
  form: {
    maxWidth: 320,
    margin: theme.spacing(6, 14),
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  formBody: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },

  // Helper text
  errorText: {
    textAlign: 'center',
    ...theme.typography.subtitle2,
  },

  // Divider
  dividerContainer: {
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

function FormLink(props) {
  return <Link component={RouterLink} {...props} />;
}

function FormDivider() {
  const classes = useStyles();

  return (
    <div className={classes.dividerContainer}>
      <Divider className={classes.divider} />
      <span className={classes.span}>OR</span>
      <Divider className={classes.divider} />
    </div>
  );
}

function Form({ onSubmit, children }) {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        {children}
      </form>
    </Paper>
  );
}

function FormPrimaryText({ children }) {
  return (
    <Typography component="h1" variant="h5" align="center" gutterBottom>
      {children}
    </Typography>
  );
}

function FormSecondaryText({ children, ...props }) {
  return (
    <Typography color="textSecondary" component="div" align="center" {...props}>
      <Box
        sx={{
          fontWeight: 'fontWeightMedium',
        }}
      >
        {children}
      </Box>
    </Typography>
  );
}

function FormErrorText({ children }) {
  const classes = useStyles();

  return (
    <FormHelperText error className={classes.errorText}>
      {children}
    </FormHelperText>
  );
}

function FormButton({ children, isLoading, ...props }) {
  return (
    <Button fullWidth color="primary" variant="contained" {...props}>
      {children}
      {isLoading && <ButtonProgress />}
    </Button>
  );
}

function FormHeader({ children }) {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      {children}
    </Box>
  );
}

function FormBody({ children }) {
  const classes = useStyles();

  return <div className={classes.formBody}>{children}</div>;
}

export {
  Form,
  FormBody,
  FormHeader,
  FormPrimaryText,
  FormSecondaryText,
  FormErrorText,
  FormButton,
  FormDivider,
  FormLink,
};
