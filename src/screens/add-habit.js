import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { habitSchema } from 'data/constraints';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { useAddHabit, useHabits } from 'api/habits';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';
import { useLocale } from 'localization';
import { useTranslation } from 'localization';

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

// Translations
const translations = {
  title: {
    pl: 'Dodaj nowy nawyk',
    es: 'Añadir un nuevo hábito',
    en: 'Create new habit',
  },
  button: {
    pl: 'Dodaj nawyk',
    es: 'Añadir hábito',
    en: 'Create habit',
  },
  nameLabel: {
    pl: 'Nawyk',
    es: 'Hábito',
    en: 'Habit name',
  },
  descriptionLabel: {
    pl: 'Opis',
    es: 'Descripción ',
    en: 'Description',
  },
  frequencyLabel: {
    pl: 'Częstotliwość',
    es: 'Frecuencia ',
    en: 'Frequency',
  },
};

function AddHabitScreen() {
  const t = useTranslation(translations);
  const { weekdays } = useLocale();
  const { openSnackbar } = useSnackbar();

  const { data: habits, isLoading } = useHabits();
  const [
    addHabit,
    { error: addingError, isLoading: isAddingHabit },
  ] = useAddHabit();

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

    addHabit(
      { name, description, frequency, position },
      {
        onSuccess: () => openSnackbar('success', 'Habit added!'),
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

  const errorText = addingError
    ? // If there is an error when adding the habit it display it first
      addingError.message
    : // Otherwise display first form error if any
      formErrors[0]?.message;

  // Disable form actions when the habit is being added
  const disableActions = isAddingHabit;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>{t('title')}</FormPrimaryText>
        <FormErrorText>{errorText || ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="name"
          label={t('nameLabel')}
          error={!!errors?.name}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <TextField
          inputRef={register}
          name="description"
          label={t('descriptionLabel')}
          error={!!errors?.description}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <CheckboxGroup
          label={t('frequencyLabel')}
          name="frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" pending={isAddingHabit}>
          {t('button')}
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { AddHabitScreen };
