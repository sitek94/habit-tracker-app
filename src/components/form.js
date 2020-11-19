import {
  Button,
  Divider,
  Grid,
  Typography,
  FormHelperText,
  makeStyles,
  Box,
  Paper,
  Link,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonProgress } from 'components/lib';

const useStyles = makeStyles(theme => ({
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
  helperText: {
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

function FormControl({ children }) {
  return <div>{children}</div>;
}

function FormContainer({ onSubmit, children }) {
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <form className={classes.form} onSubmit={onSubmit} noValidate>
        <Grid container direction="column" spacing={2}>
          {children}
        </Grid>
      </form>
    </Paper>
  );
}

const Form = ({
  onSubmit,
  primaryText,
  secondaryText,
  buttonText,
  bottomText,
  helperText,
  isError,
  isLoading,
  children,
}) => {
  const classes = useStyles();

  return (
    <FormContainer onSubmit={onSubmit}>
      <div className={classes.formHeader}>
        {/* Primary text */}
        <Typography component="h1" variant="h5" gutterBottom>
          {primaryText}
        </Typography>

        {/* Secondary text (optional) */}
        {secondaryText ? (
          <Typography
            color="textSecondary"
            component="div"
            variant="body1"
            gutterBottom
          >
            <Box fontWeight="fontWeightMedium">{secondaryText}</Box>
          </Typography>
        ) : null}

        {/* Form helper text */}
        <FormHelperText error className={classes.helperText}>
          {isError ? helperText : ' '}
        </FormHelperText>
      </div>

      <div className={classes.formBody}>
        {/* Form content */}
        {children}

        {/* Submit button */}
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

        {/* Bottom text (optional) */}
        {bottomText ? (
          <Typography color="textSecondary" component="div" align="center">
            <Box fontWeight="fontWeightMedium">{bottomText}</Box>
          </Typography>
        ) : null}
      </div>
    </FormContainer>
  );
};

export { Form, FormDivider, FormControl, FormLink };
