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
import ButtonProgress from 'components/button-progress';
import AbsoluteCenter from 'components/absolute-center';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end',
  },
  divider: {
    margin: 'auto',
  },
}));

const SignInPage = () => {
  const history = useHistory();

  const { auth } = useContext(FirebaseContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Email
  const [email, setEmailAddress] = useState('');
  const handleEmailChange = e => setEmailAddress(e.target.value);

  // Password
  const [password, setPassword] = useState('');
  const handlePasswordChange = e => setPassword(e.target.value);

  // Sign in
  const signIn = async () => {
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);

      console.log('Logged in successfully!');
      setIsLoading(false);
      history.push('/protected');
    } catch (error) {
      setErrors(error);
      setIsLoading(false);

      console.log(`Error when logging in, ${error}`);
    }
  };

  // Sign in with Authentication Provider
  const signInWithAuthProvider = async () => {
    try {
    } catch (error) {}
  };

  const classes = useStyles();

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised>
          <CardHeader title="Sign in to your account" />

          <CardContent>
            <Hidden xsDown>
              <Grid container direction="row">
                <Grid item xs={4}>
                  <AuthProviderList
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
                        autoComplete="current-password"
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
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>

            <Hidden smUp>
              <AuthProviderList
                gutterBottom
                disabled={isLoading}
                onAuthProviderClick={signInWithAuthProvider}
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
                    autoComplete="current-password"
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
              </Grid>
            </Hidden>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="outlined"
              disabled={isLoading || !email}
              onClick={() => console.log('TODO: Reset password')}
            >
              Reset password
            </Button>

            <Button
              color="primary"
              variant="contained"
              disabled={isLoading || !email || !password}
              onClick={signIn}
            >
              Sign In
              {isLoading && <ButtonProgress />}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </AbsoluteCenter>
  );
};

export default SignInPage;
