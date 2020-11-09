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
import { useDispatch, useSelector } from 'react-redux';

import { addNewHabit, fetchHabits, selectAllHabits } from './habitsSlice';
import { useFirebase } from 'features/firebase';
import { useSnackbar } from 'components/snackbar';
import { useHabits } from 'features/habits';
import { daysOfTheWeek } from 'data/days-of-the-week';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver, habitSchema } from 'libraries/yup';
import { unwrapResult } from '@reduxjs/toolkit';

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

export const AddHabitForm = () => {
  const classes = useStyles();

  const { control, register, handleSubmit, errors, getValues, reset } = useForm(
    {
      defaultValues: defaultHabit,
      resolver: yupResolver(habitSchema),
    }
  );

  const dispatch = useDispatch();
  // const habits = useSelector(selectAllHabits);

  // Contexts
  const { user } = useFirebase();
  const { openSnackbar } = useSnackbar();

  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  
  
  
  const onSaveHabitClicked = async () => {
    const { title, description, trackedDays } = getValues();
    const userId = user.uid;

    const canSave =
      [title, description, trackedDays, userId].every(Boolean) &&
      addRequestStatus === 'idle';

    if (canSave) {
      try {
        setAddRequestStatus('pending');

        const resultAction = await dispatch(
          addNewHabit({
            user: userId,
            title,
            description,
            trackedDays,
          })
        );

        unwrapResult(resultAction);
        reset(defaultHabit);
      } catch (error) {
        console.error('Failed to save the habit', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  const handleCheck = checkedDay => {
    const { trackedDays: days } = getValues();

    const newDays = days?.includes(checkedDay)
      ? days?.filter(day => day !== checkedDay)
      : [...(days ?? []), checkedDay];

    return newDays;
  };

  const isLoading = addRequestStatus === 'pending';

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card
          raised
          component="form"
          onSubmit={handleSubmit(onSaveHabitClicked)}
        >
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
