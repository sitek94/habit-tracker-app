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

import AbsoluteCenter from 'components/absolute-center';
import AuthProviderList from 'components/auth-provider-list';
import { useSnackbar } from 'components/snackbar';
import { useFirebase } from 'services/firebase';
import { signUpSchema, yupResolver } from 'libraries/yup';

const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  progress: {
    position: 'absolute',
  },
  divider: {
    margin: 'auto',
  },
});

const SignUpPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const { auth } = useFirebase();
  const { openSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = data => {
    signUp(data);
    reset();
  };

  const signUp = async ({ email, password }) => {
    try {
      setIsLoading(true);

      await auth.createUserWithEmailAndPassword(email, password);

      /**
       * ### TODO: signed in as 'User name' / email
       *
       *
       */

      openSnackbar('success', `Successfully signed up! You're now logged in.`);

      history.push('/dashboard');
    } catch ({ code, message }) {
      switch (code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
        case 'auth/operation-not-allowed':
        case 'auth/weak-password':
          openSnackbar('error', message);
          return;

        default:
          openSnackbar('error', message);
          return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised component="form" onSubmit={handleSubmit(onSubmit)}>
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
                        name="emailConfirmation"
                        autoComplete="email"
                        label="Email address confirmation"
                        placeholder="john@doe.com"
                        error={!!errors?.emailConfirmation}
                        helperText={errors?.emailConfirmation?.message || ' '}
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
                        autoComplete="new-password"
                        label="Password"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        error={!!errors?.password}
                        helperText={errors?.password?.message || ' '}
                        disabled={isLoading}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>

                    <Grid item xs>
                      <TextField
                        inputRef={register}
                        name="passwordConfirmation"
                        type="password"
                        autoComplete="password"
                        label="Password confirmation"
                        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                        error={!!errors?.passwordConfirmation}
                        helperText={
                          errors?.passwordConfirmation?.message || ' '
                        }
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
                onAuthProviderClick={() => console.log('TODO')}
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
                    name="emailConfirmation"
                    autoComplete="email"
                    label="Email address confirmation"
                    placeholder="john@doe.com"
                    error={!!errors?.emailConfirmation}
                    helperText={errors?.emailConfirmation?.message || ' '}
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
                    autoComplete="new-password"
                    label="Password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    error={!!errors?.password}
                    helperText={errors?.password?.message || ' '}
                    disabled={isLoading}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>

                <Grid item xs>
                  <TextField
                    inputRef={register}
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="password"
                    label="Password confirmation"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    error={!!errors?.passwordConfirmation}
                    helperText={errors?.passwordConfirmation?.message || ' '}
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
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
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
