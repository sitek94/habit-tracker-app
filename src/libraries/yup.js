import { yupResolver } from '@hookform/resolvers/yup';

import { object, string, array } from 'yup';

const newHabitSchema = object().shape({
  title: string().required('Title is required.'),
  description: string().notRequired(),
  trackedDays: array().required('You have to select at least one day.'),
});

const editedHabitSchema = object().shape({
  title: string().notRequired(),
  description: string().notRequired(),
  trackedDays: array().notRequired(),
});

export { yupResolver, newHabitSchema, editedHabitSchema };
