import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageErrorFallback } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useHabit } from 'hooks/useHabit';
import { useSaveHabit } from 'hooks/useSaveHabit';
import { weekdays } from 'utils/misc';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

const EditHabitScreen = () => {
  const navigate = useNavigate();
  const { habitId } = useParams();
  const { openSnackbar } = useSnackbar();

  // Habit date
  const {
    data: habit,
    isFetching,
    isError: isFetchingError,
    isFetched,
  } = useHabit(habitId);

  // Saving habit mutation
  const [
    saveHabit,
    { isLoading: isSavingHabit, isError: isSavingError, error },
  ] = useSaveHabit();

  // Form
  const {
    control,
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: initialHabit,
    resolver: yupResolver(habitSchema),
  });

  // Save edited habit
  const onSubmit = (form) => {
    saveHabit(
      { id: habitId, ...form },
      {
        onSuccess: () => {
          openSnackbar('success', 'Habit edited!');
          navigate('/manage-habits');
        },
      }
    );
    reset(initialHabit);
  };

  // Set initial values of the form
  React.useEffect(() => {
    if (isFetched) {
      const { name, description, frequency } = habit;

      setValue('name', name);
      setValue('description', description);
      setValue('frequency', frequency);
    }
  }, [habit, setValue, habitId, isFetched]);

  if (isFetchingError) {
    return <FullPageErrorFallback error={{ message: 'Fetching error' }} />;
  }

  const formErrors = Object.values(errors);
  const errorMessage =
    (isSavingError && error?.message) || formErrors[0]?.message;

  const isError = isSavingError || formErrors.length !== 0;
  const isLoading = isSavingHabit || isFetching;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Edit habit</FormPrimaryText>
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
          label="Question"
          error={!!errors?.description}
          variant="outlined"
          disabled={isLoading}
          fullWidth
        />

        <CheckboxGroup
          name="frequency"
          label="Frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" disabled={isLoading}>
          Save habit
        </FormButton>
      </FormBody>
    </Form>
  );
};

export default EditHabitScreen;
