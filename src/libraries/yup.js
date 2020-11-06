import { yupResolver } from '@hookform/resolvers/yup';

import { object, string, array, ref } from 'yup';

const habitSchema = object().shape({
  title: string().required('Title is required.'),
  description: string().notRequired(),
  trackedDays: array().required('You have to select at least one day.'),
});

const userSchema = object().shape({
  email: string()
    .email('Email address is invalid')
    .required('Email address is required.'),

  emailConfirmation: string()
    .email('Email address confirmation is invalid')
    .oneOf([ref('email'), null], `Email addresses don't match.`)
    .required('Email address confirmation is required.'),

  password: string()
    .min(6, 'Password must be at least 6 characters.')
    .required('You have to enter the password.'),

  passwordConfirmation: string()
    .min(6, 'Password must be at least 6 characters.')
    .oneOf([ref('password'), null], `Passwords don't match.`)
    .required('You have to enter the password confirmation.'),
})

export { yupResolver, habitSchema, userSchema };
