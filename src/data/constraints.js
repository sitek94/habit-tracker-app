import { object, string, array, ref } from 'yup';

/**
 * HABIT
 */
const habit = {
  name: string().required('Title is required.'),
  description: string().notRequired(),
  frequency: array().required('You have to select at least one day.'),
};

// Habit schema
const habitSchema = object().shape({
  name: habit.name,
  description: habit.description,
  frequency: habit.frequency,
});

/**
 * USER
 */
const user = {
  email: string()
    .email('Email address is invalid')
    .required('Email address is required.'),

  password: string()
    .min(6, 'Password must be at least 6 characters.')
    .required('You have to enter the password.'),

  passwordConfirmation: string()
    .min(6, 'Password must be at least 6 characters.')
    .oneOf([ref('password'), null], `Passwords don't match.`)
    .required('You have to enter the password confirmation.'),
};

// Sign in schema
const signInSchema = object().shape({
  email: user.email,
  password: user.password,
});

// Sign up schema
const signUpSchema = object().shape({
  email: user.email,
  password: user.password,
  passwordConfirmation: user.passwordConfirmation,
});

// Reset password schema
const resetPasswordSchema = object().shape({
  email: user.email,
});

export { habitSchema, signInSchema, signUpSchema, resetPasswordSchema };
