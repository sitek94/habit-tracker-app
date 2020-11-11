import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import { useFirebase } from 'services/firebase';
import { useSnackbar } from 'components/snackbar';
import { daysOfTheWeek } from 'data/days-of-the-week';
import { useForm, Controller } from 'react-hook-form';
import { habitSchema } from 'data/constraints';

const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  formLabel: {
    cursor: 'pointer',
  },
  helperText: {
    textAlign: 'center',
  },
});

const EditHabitPage = ({ habit }) => {
  const classes = useStyles();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const { db } = useFirebase();
  const { openSnackbar } = useSnackbar();

  const { id, title, description, trackedDays } = habit;

  const { control, register, handleSubmit, errors, getValues } = useForm(
    {
      defaultValues: { title, description, trackedDays },
      resolver: yupResolver(habitSchema),
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
    updateHabit(data);
  };

  const updateHabit = async updatedHabit => {
    setIsLoading(true);

    try {
      const habitRef = db.collection('habits').doc(id);

      // Update the habit in database
      await habitRef.update(updatedHabit);

      // If the habit was successufully updated, update the habit locally
      // setHabits(
      //   habits.map(habit =>
      //     habit.id === id ? { ...habit, ...updatedHabit } : habit
      //   )
      // );

      setIsLoading(false);
      openSnackbar('success', 'Successfully updated the habit!');
    } catch (error) {
      console.log(error);

      openSnackbar('error', 'Failed to update the habit');
    } finally {
      setIsLoading(false);

      // Redirect the user back to all habits
      history.push('/dashboard/habits');
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
                  label="New Title"
                  placeholder={title}
                  error={!!errors?.title}
                  helperText={errors?.title?.message || ' '}
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
                  placeholder={description}
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
                    {errors?.trackedDays?.message || ' '}
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
              Sava changes
              {isLoading && <ButtonProgress />}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </AbsoluteCenter>
  );
};

export default EditHabitPage;
