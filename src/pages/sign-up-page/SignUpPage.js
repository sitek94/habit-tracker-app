import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { LockOutlined as LockIcon } from '@material-ui/icons';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    // Fix IE 11 issue
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

const SignUp = () => {
  const history = useHistory();
  const classes = useStyles();

  // First name
  const [firstName, setFirstName] = useState('');
  const handleFirstNameChange = e => setFirstName(e.target.value);

  // Last name
  const [lastName, setLastName] = useState('');
  const handleLastNameChange = e => setLastName(e.target.value);

  // Phone number
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumberChange = e => setPhoneNumber(e.target.value);

  // Country
  const [country, setCountry] = useState('');
  const handleCountryChange = e => setCountry(e.target.value);

  // Username
  const [username, setUsername] = useState('');
  const handleUsernameChange = e => setUsername(e.target.value);

  // Email
  const [email, setEmail] = useState('');
  const handleEmailChange = e => setEmail(e.target.value);

  // Password
  const [password, setPassword] = useState('');
  const handlePasswordChange = e => setPassword(e.target.value);

  // Confirm password
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleConfirmPasswordChange = e => setConfirmPassword(e.target.value);

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    const newUserData = {
      firstName,
      lastName,
      phoneNumber,
      country,
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      const res = await axios.post('/signup', newUserData);

      localStorage.setItem('AuthToken', `${res.data.token}`);
      setIsLoading(false);

      history.push('/');
    } catch (err) {
      console.log('Error when signing up:', err);

      setErrors(err.response.data);
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* FIRST NAME */}
              <TextField
                type="text"
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                label="First Name"
                autoFocus
                required
                error={errors.firstName ? true : false}
                helperText={errors.firstName}
                onChange={handleFirstNameChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* LAST NAME */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                label="Last Name"
                autoFocus
                required
                error={errors.lastName ? true : false}
                helperText={errors.lastName}
                onChange={handleLastNameChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* USERNAME */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                id="username"
                name="username"
                autoComplete="username"
                label="Username"
                autoFocus
                required
                error={errors.username ? true : false}
                helperText={errors.username}
                onChange={handleUsernameChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* PHONE NUMBER */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                autoComplete="phoneNumber"
                label="Phone Number"

                // # TODO telephone number pattern
                pattern="\d+"
                autoFocus
                required
                error={errors.phoneNumber ? true : false}
                helperText={errors.phoneNumber}
                onChange={handlePhoneNumberChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* EMAIL ADDRESS */}
            <Grid item xs={12}>
              <TextField
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                label="Email Address"
                autoFocus
                required
                error={errors.email ? true : false}
                helperText={errors.email}
                onChange={handleEmailChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* COUNTRY */}
            <Grid item xs={12}>
              <TextField
                type="text"
                id="country"
                name="country"
                autoComplete="country"
                label="Country"
                autoFocus
                required
                error={errors.country ? true : false}
                helperText={errors.country}
                onChange={handleCountryChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* PASSWORD */}
            <Grid item xs={12}>
              <TextField
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                label="Password"
                autoFocus
                required
                error={errors.password ? true : false}
                helperText={errors.password}
                onChange={handlePasswordChange}
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* CONFIRM PASSWORD */}
            <Grid item xs={12}>
              <TextField
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="current-password"
                label="Confrim Password"
                autoFocus
                required
                error={errors.confirmPassword ? true : false}
                helperText={errors.confirmPassword}
                onChange={handleConfirmPasswordChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            className={classes.submit}
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            fullWidth
            disabled={
              isLoading || [
                firstName,
                lastName,
                phoneNumber,
                country,
                username,
                email,
                password,
                confirmPassword,
              ].some(i => !i)
            }
          >
            Sign Up
            {isLoading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
