import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { LockOutlined as LockIcon } from '@material-ui/icons';

import { FirebaseContext } from 'api';

const useStyles = makeStyles(({ spacing, palette }) => ({
  paper: {
    marginTop: spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: spacing(1),
    backgroundColor: palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: spacing(1),
  },
  submit: {
    margin: spacing(3, 0, 2),
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: spacing(1),
  },
  progress: {
    position: 'absolute',
  },
}));

const LoginPage = props => {
  const history = useHistory();

  const { auth } = useContext(FirebaseContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  // Email
  const [emailAddress, setEmailAddress] = useState('');
  const handleEmailAddressChange = e => setEmailAddress(e.target.value);

  // Password
  const [password, setPassword] = useState('');
  const handlePasswordChange = e => setPassword(e.target.value);

  // Sign in
  const signIn = async () => {
    try {
      await auth.signInWithEmailAndPassword(emailAddress, password);

      console.log('Logged in successfully!');
      history.push('/protected');
    } catch (error) {
      console.log(`Error when logging in, ${error}`);
    }
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className={classes.from} noValidate>
          <TextField
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            label="Email Address"
            autoFocus
            required
            onChange={handleEmailAddressChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <TextField
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            label="Password"
            autoFocus
            required
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            fullWidth
          />

          <Button
            className={classes.submit}
            onClick={signIn}
            color="primary"
            variant="contained"
            fullWidth
            disabled={isLoading || !emailAddress || !password}
          >
            Sign In
            {isLoading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
