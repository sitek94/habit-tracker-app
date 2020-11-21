import * as React from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { makeStyles, TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormPrimaryText,
} from 'components/form';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useHabit } from 'hooks/useHabit';
import { useSaveHabit } from 'hooks/useSaveHabit';
import { weekdays } from 'utils/misc';

// Styles
const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  formControl: {
    width: '100%',
  },
  frequencyLabel: {
    // 14px is a value taken from .MuiOutlinedInput-input
    // so that the label is aligned equally to other labels
    padding: '0 14px',
  },

  disableMargin: {
    marginLeft: 0,
    marginRight: 0,
  },
});

// Initial habit
const initialHabit = {
  name: '',
  description: '',
  frequency: [],
};

const EditHabitScreen = () => {
  const { habitId } = useParams();
  const { openSnackbar } = useSnackbar();

  const { status: habitStatus, data: habit, error } = useHabit(habitId);
  const [saveHabit, { status: saveHabitStatus }] = useSaveHabit();

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

  // Set initial values of the form
  React.useEffect(() => {
    if (!habit) return;
    const { name, description, frequency } = habit;

    setValue('name', name);
    setValue('description', description);
    setValue('frequency', frequency);
  }, [habit, setValue, habitId]);

  // Save edited habit
  const onSubmit = form => {
    const { name, description, frequency } = form;

    saveHabit({ ...habit, name, description, frequency });

    reset(initialHabit);
  };

  if (habitStatus === 'loading') {
    return <FullPageSpinner />
  }

  const formErrors = Object.values(errors);
  const errorMessage = error?.message || formErrors[0]?.message;

  const isError = habitStatus === 'error' || formErrors.length !== 0;
  const isLoading = habitStatus === 'loading';

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
