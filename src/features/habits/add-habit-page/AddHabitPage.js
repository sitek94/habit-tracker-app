import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';
import ButtonProgress from 'components/button-progress';

import dayjs from 'services/dayjs';

import { useFirebase } from 'services/firebase';
import { useSnackbar } from 'components/snackbar';
import { habitSchema } from 'data/constraints';

// Styles
const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  frequencyLabel: {
    cursor: 'pointer',
    // 14px is a value taken from .MuiOutlinedInput-input
    // so that the label is aligned equally to other labels
    padding: '0 14px',
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

/**
 * Add habit page
 *
 * Allows a user to add a new habit.
 *
 */
const AddHabitPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { db, user } = useFirebase();
  const { openSnackbar } = useSnackbar();

  // Form
  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: initialHabit,
      resolver: yupResolver(habitSchema),
    }
  );

  const handleCheck = checkedDay => {
    const { frequencyValue: days } = getValues();

    const newDays = days?.includes(checkedDay)
      ? days?.filter(day => day !== checkedDay)
      : [...(days ?? []), checkedDay];

    return newDays;
  };

  const onSubmit = data => {
    addHabit(data);

    reset(initialHabit);
  };

  //Add new habit
  const addHabit = async ({
    name,
    description,
    frequencyType = 'weekdays',
    frequencyValue,
  }) => {
    setIsLoading(true);

    try {
      // Create a new habit object
      const newHabit = {
        user: user.uid,
        name,
        description,
        frequency: {
          type: frequencyType,
          value: frequencyValue,
        },
        createdAt: new Date().toISOString(),
      };

      // Get a key (ID) for new habit
      const newHabitKey = db.ref().child('habits').push().key;

      // Add habit to the database.
      await db.ref(`habits/${newHabitKey}`).set(newHabit);

      openSnackbar('success', 'Successfully created a habit!');
    } catch (error) {
      console.log('Error when adding a new habit: ', error);

      openSnackbar('error', 'Something went wrong when adding the habit.');
    } finally {
      setIsLoading(false);
    }
  };

  // ['Monday', ... , 'Sunday']
  const weekdays = dayjs.weekdays(dayjs());

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised component="form" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader name="Create a new habit" />

          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  inputRef={register}
                  name="name"
                  label="Name"
                  error={!!(errors && errors.name)}
                  helperText={
                    errors && errors.name ? errors.name.message : ' '
                  }
                  variant="outlined"
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <TextField
                  inputRef={register}
                  name="description"
                  label="Question (optional)"
                  variant="outlined"
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  error={!!(errors && errors.frequencyValue)}
                >
                  <FormLabel
                    component="legend"
                    className={classes.frequencyLabel}
                  >
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
                                onChange={() =>
                                  props.onChange(handleCheck(number))
                                }
                                checked={props.value.includes(number)}
                              />
                            }
                            key={name}
                            label={name.slice(0, 3)}
                            labelPlacement="bottom"
                          />
                        ))
                      }
                    />
                  </FormGroup>
                  <FormHelperText>
                    {errors && errors.frequencyValue
                      ? errors.frequencyValue.message
                      : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isLoading}
            >
              Add habit
              {isLoading && <ButtonProgress />}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </AbsoluteCenter>
  );
};

export default AddHabitPage;
