import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  TextField,
} from '@material-ui/core';
import { FirebaseContext } from 'api/firebase-context';
import AuthProviderList from 'components/auth-provider-list';
import AbsoluteCenter from 'components/absolute-center';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(({ spacing, palette }) => ({
  actions: {
    justifyContent: 'flex-end',
  },
  progress: {
    position: 'absolute',
  },
  divider: {
    margin: 'auto',
  },
}));

const SignUpPage = () => {
  const history = useHistory();
  const classes = useStyles();

  // Email
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);

  const [emailConfirmation, setEmailConfirmation] = useState('');
  const handleEmailConfirmationChange = e =>
    setEmailConfirmation(e.target.value);

  // Password
  const [password, setPassword] = useState('');
  const handlePasswordChange = e => setPassword(e.target.value);

  // Confirm password
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const handlePasswordConfirmationChange = e =>
    setPasswordConfirmation(e.target.value);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * ### TODO: Use validate.js to validate the fields before sending request
   *
   */
  const { auth } = useContext(FirebaseContext);

  const signUp = async () => {
    try {
      setErrors(null);
      setIsLoading(true);

      await auth.createUserWithEmailAndPassword(email, password);

      history.push('/protected');
    } catch (err) {
      /**
       * ### TODO: Handle errors
       *
       * Display them as helper texts
       */
      console.log(err);
    } finally {
      setIsLoading(false);

      /**
       * ### TODO: Reset fields after wrong try
       *
       */
    }
  };

  return (
    <AbsoluteCenter>
      <Container maxWidth="sm">
        <Card raised>
          <CardHeader title="Sign up for an account" />

          <CardContent>
            <Hidden xsDown>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <AuthProviderList
                    disabled={isLoading}
                    onAuthProviderClick={() => console.log('TODO')}
                  />
                </Grid>

                <Grid item xs={1}>
                  <Divider className={classes.divider} orientation="vertical" />
                </Grid>

                <Grid item xs={7}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                      <TextField
                        autoComplete="email"
                        disabled={isLoading}
                        error={!!(errors && errors.email)}
                        fullWidth
                        helperText={
                          errors && errors.email ? errors.email[0] : ''
                        }
                        label="E-mail address"
                        placeholder="john@doe.com"
                        required
                        type="email"
                        value={email}
                        variant="outlined"
                        InputLabelProps={{ required: false }}
                        onChange={handleEmailChange}
                      />
                    </Grid>

                    <Grid item xs>
                      <TextField
                        autoComplete="email"
                        disabled={isLoading}
                        error={!!(errors && errors.emailConfirmation)}
                        fullWidth
                        helperText={
                          errors && errors.emailConfirmation
                            ? errors.emailConfirmation[0]
                            : ''
                        }
                        label="E-mail address confirmation"
                        placeholder="john@doe.com"
                        required
                        type="email"
                        value={emailConfirmation}
                        variant="outlined"
                        InputLabelProps={{ required: false }}
                        onChange={handleEmailConfirmationChange}
                      />
                    </Grid>

                    <Grid item xs>
                      <TextField
                        autoComplete="new-password"
                        disabled={isLoading}
                        error={!!(errors && errors.password)}
                        fullWidth
                        helperText={
                          errors && errors.password ? errors.password[0] : ''
                        }
                        label="Password"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        required
                        type="password"
                        value={password}
                        variant="outlined"
                        InputLabelProps={{ required: false }}
                        onChange={handlePasswordChange}
                      />
                    </Grid>

                    <Grid item xs>
                      <TextField
                        autoComplete="password"
                        disabled={isLoading}
                        error={!!(errors && errors.passwordConfirmation)}
                        fullWidth
                        helperText={
                          errors && errors.passwordConfirmation
                            ? errors.passwordConfirmation[0]
                            : ''
                        }
                        label="Password confirmation"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        required
                        type="password"
                        value={passwordConfirmation}
                        variant="outlined"
                        InputLabelProps={{ required: false }}
                        onChange={handlePasswordConfirmationChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <AuthProviderList
                onAuthProviderClick={() => console.log('TODO')}
              />

              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <TextField
                    autoComplete="email"
                    disabled={isLoading}
                    error={!!(errors && errors.email)}
                    fullWidth
                    helperText={errors && errors.email ? errors.email[0] : ''}
                    label="E-mail address"
                    placeholder="john@doe.com"
                    required
                    type="email"
                    value={email}
                    variant="outlined"
                    InputLabelProps={{ required: false }}
                    onChange={handleEmailChange}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoComplete="email"
                    disabled={isLoading}
                    error={!!(errors && errors.emailConfirmation)}
                    fullWidth
                    helperText={
                      errors && errors.emailConfirmation
                        ? errors.emailConfirmation[0]
                        : ''
                    }
                    label="E-mail address confirmation"
                    placeholder="john@doe.com"
                    required
                    type="email"
                    value={emailConfirmation}
                    variant="outlined"
                    InputLabelProps={{ required: false }}
                    onChange={handleEmailConfirmationChange}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoComplete="new-password"
                    disabled={isLoading}
                    error={!!(errors && errors.password)}
                    fullWidth
                    helperText={
                      errors && errors.password ? errors.password[0] : ''
                    }
                    label="Password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    required
                    type="password"
                    value={password}
                    variant="outlined"
                    InputLabelProps={{ required: false }}
                    onChange={handlePasswordChange}
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    autoComplete="password"
                    disabled={isLoading}
                    error={!!(errors && errors.passwordConfirmation)}
                    fullWidth
                    helperText={
                      errors && errors.passwordConfirmation
                        ? errors.passwordConfirmation[0]
                        : ''
                    }
                    label="Password confirmation"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    required
                    type="password"
                    value={passwordConfirmation}
                    variant="outlined"
                    InputLabelProps={{ required: false }}
                    onChange={handlePasswordConfirmationChange}
                  />
                </Grid>
              </Grid>
            </Hidden>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              disabled={
                isLoading ||
                !email ||
                !emailConfirmation ||
                !password ||
                !passwordConfirmation
              }
              onClick={signUp}
            >
              Sign up
            </Button>
          </CardActions>
        </Card>
      </Container>
    </AbsoluteCenter>
  );
};

export default SignUpPage;
