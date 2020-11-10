import { yupResolver } from '@hookform/resolvers/yup';

import { object, string, array, ref } from 'yup';

/**
 * HABIT
 */
const title = string().required('Title is required.');
const description = string().notRequired();
const frequencyValue = array().required('You have to select at least one day.');

const habitSchema = object().shape({
  title,
  description,
  frequencyValue,
});

/**
 * USER
 */
const email = string()
  .email('Email address is invalid')
  .required('Email address is required.');

const emailConfirmation = string()
  .email('Email address confirmation is invalid')
  .oneOf([ref('email'), null], `Email addresses don't match.`)
  .required('Email address confirmation is required.');

const password = string()
  .min(6, 'Password must be at least 6 characters.')
  .required('You have to enter the password.');

const passwordConfirmation = string()
  .min(6, 'Password must be at least 6 characters.')
  .oneOf([ref('password'), null], `Passwords don't match.`)
  .required('You have to enter the password confirmation.');

const signInSchema = object().shape({
  email,
  password
});

const signUpSchema = object().shape({
  email,
  emailConfirmation,
  password,
  passwordConfirmation,
})

export { yupResolver, habitSchema, signInSchema, signUpSchema };
