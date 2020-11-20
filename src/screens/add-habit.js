import * as React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Form, FormItem } from 'components/form';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useAddHabit } from 'hooks/useAddHabit';
import { weekdays } from 'utils/misc';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  TextField,
} from '@material-ui/core';

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
  /**
   * # TODO: Add more types
   *
   * It, should be possible, for example, to set the habit to occur
   * every X days.
   *
   */
  frequencyType: 'weekdays',
  frequencyValue: [],
};

const AddHabitScreen = () => {
  const classes = useStyles();
  const { openSnackbar } = useSnackbar();
  const [
    addHabit,
    { isLoading, isError: isAddingHabitError, error },
  ] = useAddHabit();

  // Form
  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: initialHabit,
      resolver: yupResolver(habitSchema),
    }
  );
  const handleCheckbox = checkedDay => {
    const { frequencyValue: days } = getValues();

    const newDays = days?.includes(checkedDay)
      ? days?.filter(day => day !== checkedDay)
      : [...(days ?? []), checkedDay];

    return newDays;
  };

  // Submit form
  const onSubmit = form => {
    const { name, description, frequencyValue } = form;

    addHabit(
      { name, description, frequency: frequencyValue },
      {
        onSuccess: () => openSnackbar('success', 'Habit added!'),
      }
    );
    reset(initialHabit);
  };

  const formErrors = Object.values(errors);
  const isError = isAddingHabitError || formErrors.length !== 0;
  const errorMessage = error?.message || formErrors[0]?.message;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      primaryText="Create new habit"
      buttonText="Create habit"
      isLoading={isLoading}
      isError={isError}
      helperText={errorMessage}
    >
      <FormItem>
        <TextField
          inputRef={register}
          name="name"
          label="Habit name"
          error={!!errors?.name}
          variant="outlined"
          disabled={isLoading}
          fullWidth
        />
      </FormItem>

      <FormItem>
        <TextField
          inputRef={register}
          name="description"
          label="Question (optional)"
          error={!!errors?.description}
          variant="outlined"
          disabled={isLoading}
          fullWidth
        />
      </FormItem>

      <FormItem>
        <FormControl
          component="fieldset"
          className={classes.formControl}
          error={!!(errors && errors.frequencyValue)}
        >
          <FormLabel component="legend" className={classes.frequencyLabel}>
            Frequency
          </FormLabel>
          <FormGroup row>
            <Controller
              name="frequencyValue"
              control={control}
              render={props =>
                weekdays.map((name, number) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => props.onChange(handleCheckbox(number))}
                        checked={props.value.includes(number)}
                      />
                    }
                    key={name}
                    label={name.slice(0, 3)}
                    labelPlacement="bottom"
                    className={classes.disableMargin}
                  />
                ))
              }
            />
          </FormGroup>
        </FormControl>
      </FormItem>
    </Form>
  );
};

export default AddHabitScreen;
