import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useHabitById } from 'hooks/useHabit';
import { useUpdateHabit } from 'hooks/useUpdateHabit';
import { weekdays } from 'utils/misc';
import { NotFoundHabitScreen } from './not-found-habit';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';

// Default habit values
const defaultHabit = {
  name: '',
  description: '',
  frequency: [],
};

function EditHabitScreen() {
  const navigate = useNavigate();
  const { habitId } = useParams();
  const { openSnackbar } = useSnackbar();

  const { data: habit, error: habitError, isFetching } = useHabitById(habitId);
  const [updateHabit, { isLoading: isUpdatingHabit }] = useUpdateHabit();

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
    defaultValues: defaultHabit,
    resolver: yupResolver(habitSchema),
  });

  // Save edited habit
  const onSubmit = (form) => {
    updateHabit(
      { id: habitId, ...form },
      {
        onSuccess: () => {
          openSnackbar('success', 'Habit edited!');
          navigate('/manage-habits');
        },
      }
    );
    reset(defaultHabit);
  };

  // Set initial values of the form
  React.useEffect(() => {
    if (habit) {
      const { name, description, frequency } = habit;

      setValue('name', name);
      setValue('description', description);
      setValue('frequency', frequency);
    }
  }, [habit, setValue, habitId]);

  // Get array of errors from the form
  const formErrors = Object.values(errors);

  const errorText = habitError
    ? // If there is an error with fetching the habit it display it first
      habitError.message
    : // Otherwise display first form error if any
      formErrors[0]?.message;

  if (isFetching) {
    return <FullPageSpinner />;
  }

  // There is no data corresponding with the habit id
  if (!habit) {
    return <NotFoundHabitScreen />;
  }

  // Disable form actions when the habit is updating
  const disableActions = isUpdatingHabit;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Edit habit</FormPrimaryText>
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
          label="Question"
          error={!!errors?.description}
          variant="outlined"
          disabled={disableActions}
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

        <FormButton type="submit" disabled={disableActions}>
          Save habit
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { EditHabitScreen };
