import { useState } from 'react';

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

import { useFirebase } from 'features/firebase';
import { useSnackbar } from 'components/snackbar';
import { useHabits } from 'features/habits';
import { daysOfTheWeek } from 'data/days-of-the-week';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver, newHabitSchema } from 'libraries/yup';

const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  formLabel: {
    cursor: 'pointer',
    // 14px is a value taken from .MuiOutlinedInput-input
    padding: '0 14px',
  },
});

const defaultHabit = {
  title: '',
  description: '',
  trackedDays: [],
};

const AddHabitPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { db, user } = useFirebase();
  const { openSnackbar } = useSnackbar();
  const { habits, setHabits } = useHabits();

  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: defaultHabit,
      resolver: yupResolver(newHabitSchema),
    }
  );

  const handleCheck = checkedDay => {
    const { trackedDays: days } = getValues();

    const newDays = days?.includes(checkedDay)
      ? days?.filter(day => day !== checkedDay)
      : [...(days ?? []), checkedDay];

    return newDays;
  };

  const onSubmit = data => {
    addHabit(data);

    reset(defaultHabit);
  };

  //Add new habit
  const addHabit = async ({ title, description, trackedDays }) => {
    setIsLoading(true);

    try {
      const newHabit = {
        uid: user.uid,
        title,
        description,
        trackedDays,
        createdAt: new Date().toISOString(),
      };

      // If habit was successfully added to database,
      // add it to local habits as well
      const { id } = await db.collection('habits').add(newHabit);

      setHabits([
        ...habits,
        {
          ...newHabit,
          id,
        },
      ]);

      openSnackbar('success', 'Successfully created a habit!');
    } catch (error) {
      console.log('Error when adding a new habit: ', error);

      openSnackbar('error', 'Something went wrong when adding the habit.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised component="form" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Create a new habit" />

          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  inputRef={register}
                  name="title"
                  label="Title"
                  error={!!(errors && errors.title)}
                  helperText={
                    errors && errors.title ? errors.title.message : ' '
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
                  label="Description (optional)"
                  variant="outlined"
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  error={!!(errors && errors.trackedDays)}
                >
                  <FormLabel component="legend" className={classes.formLabel}>
                    Frequency
                  </FormLabel>
                  <FormGroup row>
                    <Controller
                      name="trackedDays"
                      control={control}
                      render={props =>
                        daysOfTheWeek.map(day => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={() =>
                                  props.onChange(handleCheck(day))
                                }
                                checked={props.value.includes(day)}
                              />
                            }
                            key={day}
                            label={day.slice(0, 3)}
                            labelPlacement="bottom"
                          />
                        ))
                      }
                    />
                  </FormGroup>
                  <FormHelperText>
                    {errors && errors.trackedDays
                      ? errors.trackedDays.message
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
