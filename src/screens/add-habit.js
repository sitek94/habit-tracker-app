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

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

const AddHabitScreen = () => {
  const { openSnackbar } = useSnackbar();

  // Add habit mutation
  const [addHabit, { status, error }] = useAddHabit();

  // Form
  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: initialHabit,
      resolver: yupResolver(habitSchema),
    }
  );

  // Submit form
  const onSubmit = form => {
    const { name, description, frequency } = form;

    addHabit(
      { name, description, frequency },
      {
        onSuccess: () => openSnackbar('success', 'Habit added!'),
      }
    );
    reset(initialHabit);
  };

  const formErrors = Object.values(errors);
  const isError = status === 'error' || formErrors.length !== 0;
  const errorMessage = error?.message || formErrors[0]?.message;
  const isLoading = status === 'loading';

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Create new habit</FormPrimaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="name"
          label="Habit name"
          error={!!errors?.name}
          variant="outlined"
          disabled={isLoading}
          fullWidth
        />

        <TextField
          inputRef={register}
          name="description"
          label="Question (optional)"
          error={!!errors?.description}
          variant="outlined"
          disabled={isLoading}
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

        <FormButton type="submit" disabled={isLoading}>
          Create habit
        </FormButton>
      </FormBody>
    </Form>
  );
};

export default AddHabitScreen;
