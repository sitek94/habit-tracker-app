import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { habitSchema } from 'data/constraints';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { useAddHabitMutation, useHabitsQuery } from 'api/habits';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';
import { useLocale } from 'localization';
import { useTranslation } from 'translations';

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

function AddHabitScreen() {
  const t = useTranslation();
  const { weekdays } = useLocale();
  const { openSnackbar } = useSnackbar();

  const { data: habits, isLoading } = useHabitsQuery();
  const addHabitMutation = useAddHabitMutation();

  // Form
  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: initialHabit,
      resolver: yupResolver(habitSchema),
    }
  );

  // Submit form
  const onSubmit = (form) => {
    const { name, description, frequency } = form;
    // Habit's position is based on the number of habits
    const position = habits.length;

    addHabitMutation.mutate(
      { name, description, frequency, position },
      {
        onSuccess: () => openSnackbar('success', t('habitAdded')),
      }
    );
    reset(initialHabit);
  };

  // Is loading habits
  if (isLoading) {
    return <FullPageSpinner />;
  }

  // Get array of errors from the form
  const formErrors = Object.values(errors);

  const errorText = addHabitMutation.isError
    ? // If there is an error when adding the habit it display it first
      addHabitMutation.error.message
    : // Otherwise display first form error if any
      formErrors[0]?.message;

  // Disable form actions when the habit is being added
  const disableActions = addHabitMutation.isLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>{t('createNewHabit')}</FormPrimaryText>
        <FormErrorText>{errorText || ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="name"
          label={t('habitNameLabel')}
          error={!!errors?.name}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <TextField
          inputRef={register}
          name="description"
          label={t('habitDescriptionLabel')}
          error={!!errors?.description}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <CheckboxGroup
          label={t('habitFrequencyLabel')}
          name="frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" pending={disableActions}>
          {t('createHabit')}
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { AddHabitScreen };
