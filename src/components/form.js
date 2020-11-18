import {
  Button,
  Divider,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ButtonProgress from 'components/button-progress';

const useStyles = makeStyles(theme => ({
  // Container
  formContainer: {
    maxWidth: 586,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(6, 14),
  },
  formHeader: {
    textAlign: 'center',
  },
  form: {
    maxWidth: 320,
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

function FormControl({ children }) {
  return <Grid item>{children}</Grid>;
}

function FormContainer({ onSubmit, children }) {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.formContainer}>
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        <Grid container direction="column" spacing={2}>
          {children}
        </Grid>
      </form>
    </Paper>
  );
}

const Form = ({
  primaryText,
  secondaryText,
  buttonText,
  bottomText,
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <FormContainer>
      <FormControl>
        <Typography align="center" component="h1" variant="h5" gutterBottom>
          {primaryText}
        </Typography>
        <Typography align="center" color="textSecondary" variant="body1" gutterBottom>
          {secondaryText}
        </Typography>
      </FormControl>

      {children}

      <FormControl>
        <Button
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          disabled={isLoading}
        >
          {buttonText}
          {isLoading && <ButtonProgress />}
        </Button>
      </FormControl>

      {bottomText ? (
        <FormControl>
          <Typography color="textSecondary" align="center">
            {bottomText}
          </Typography>
        </FormControl>
      ) : null}
    </FormContainer>
  );
};

export { Form, FormDivider, FormControl };
