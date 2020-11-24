import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useAddHabit } from 'hooks/useAddHabit';
import { weekdays } from 'utils/misc';
import { useHabits } from 'hooks/useHabits';
import { FullPageSpinner } from 'components/lib';

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

const AddHabitScreen = () => {
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
        <FormPrimaryText>Create new habit</FormPrimaryText>
        <FormErrorText>{errorText || ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="name"
          label="Habit name"
          error={!!errors?.name}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <TextField
          inputRef={register}
          name="description"
          label="Question (optional)"
          error={!!errors?.description}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <CheckboxGroup
          label="Frequency"
          name="frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" disabled={disableActions}>
          Create habit
        </FormButton>
      </FormBody>
    </Form>
  );
};

export default AddHabitScreen;
