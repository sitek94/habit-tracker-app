import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

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

import AuthProviderList from 'components/auth-provider-list';
import ButtonProgress from 'components/button-progress';
import AbsoluteCenter from 'components/absolute-center';
import { useSnackbar } from 'components/snackbar';
import { useFirebase } from 'features/firebase';
import { yupResolver, signInSchema } from 'libraries/yup';

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

  const { auth } = useFirebase();
  const { openSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = data => {
    signIn(data);
    reset();
  };

  // Sign in
  const signIn = async ({ email, password }) => {
    setIsLoading(true);

    try {
      await auth.signInWithEmailAndPassword(email, password);

      openSnackbar('success', 'Logged in successfully!');
      setIsLoading(false);

      history.push('/dashboard');
    } catch ({ code, message }) {
      setIsLoading(false);

      switch (code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
          openSnackbar('error', message);
          return;

        default:
          openSnackbar('error', message);
          return;
      }
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
        <Card raised component="form" onSubmit={handleSubmit(onSubmit)}>
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
                        inputRef={register}
                        name="email"
                        autoComplete="email"
                        label="Email address"
                        placeholder="john@doe.com"
                        error={!!errors?.email}
                        helperText={errors?.email?.message || ' '}
                        disabled={isLoading}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <TextField
                        inputRef={register}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        label="Password"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        error={!!errors?.password}
                        helperText={errors?.password?.message || ' '}
                        disabled={isLoading}
                        variant="outlined"
                        fullWidth
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
                    inputRef={register}
                    name="email"
                    autoComplete="email"
                    label="Email address"
                    placeholder="john@doe.com"
                    error={!!errors?.email}
                    helperText={errors?.email?.message || ' '}
                    disabled={isLoading}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    inputRef={register}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    label="Password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    error={!!errors?.password}
                    helperText={errors?.password?.message || ' '}
                    disabled={isLoading}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Hidden>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="outlined"
              disabled={isLoading}
              onClick={() => console.log('TODO: Reset password')}
            >
              Reset password
            </Button>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
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
