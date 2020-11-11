import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
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
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';
import ButtonProgress from 'components/button-progress';
import Loader from 'components/loader';

import dayjs from 'services/dayjs';

import { useFirebase } from 'services/firebase';
import { useSnackbar } from 'components/snackbar';
import { habitSchema } from 'data/constraints';

// Styles
const useStyles = makeStyles({
  actions: {
    justifyContent: 'flex-end',
  },
  formControl: {
    width: '100%',
  },
  helperText: {
    textAlign: 'center',
  },
});

const EditHabitPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const { db } = useFirebase();
  const { habitId } = useParams();
  const { openSnackbar } = useSnackbar();

  // Form 
  const {
    control,
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      frequencyType: '',
      frequencyValue: [],
    },
    resolver: yupResolver(habitSchema),
  });

  // Handle clicking on checkbox
  const handleCheck = checkedDay => {
    const { frequencyValue: days } = getValues();

    const newDays = days?.includes(checkedDay)
      ? days?.filter(day => day !== checkedDay)
      : [...(days ?? []), checkedDay];

    return newDays;
  };

  // Fetch initial habit details
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const snapshot = await db.ref(`/habits/${habitId}`).once('value');

        setIsInitialized(true);

        const fetchedHabit = snapshot.val();

        // Habit doesn't exist, redirect the user to `not-found` page
        // # TODO: Inform the user that the habit was not found instead of generic error
        if (!fetchedHabit) {
          history.push('/not-found');
        }

        const {
          name,
          description,
          frequency: { type, value },
        } = fetchedHabit;

        // Update values in the form with the fetched values of the habit
        setValue('name', name);
        setValue('description', description);
        setValue('frequencyType', type);
        setValue('frequencyValue', value);
      } catch (error) {
        setIsInitialized(true);

        console.log('Something went wrong when fetching initial habit.', error);
      }
    };

    fetchHabit();
  }, [db, habitId, history, setValue]);

  // Handle submitting the form
  const onSubmit = data => {
    updateHabit(data);
  };

  /**
   * Updates the habit in the database.
   */
  const updateHabit = async ({ name, description, frequencyType, frequencyValue }) => {
    setIsLoading(true);

    try {
      const updatedHabit = {
        name, 
        description,
        frequency: { 
          type: frequencyType,
          value: frequencyValue,
        }
      }

      // Update the habit in database
      await db.ref(`/habits/${habitId}`).update(updatedHabit);

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

  // Component is fetching the habit to set the default values
  if (!isInitialized) {
    return <Loader />;
  }

  // ['Monday', ... , 'Sunday']
  const weekdays = dayjs.weekdays(dayjs());

  // Habit name and description are used placeholders
  const { name, description } = getValues();

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised component="form" onSubmit={handleSubmit(onSubmit)}>
          <CardHeader title="Edit habit" />

          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  inputRef={register}
                  name="name"
                  label="New habit name"
                  placeholder={name}
                  error={!!errors?.name}
                  helperText={errors?.name?.message || ' '}
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
                  error={!!(errors && errors.description)}
                  helperText={
                    errors && errors.description
                      ? errors.description.message
                      : ' '
                  }
                  variant="outlined"
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={!!(errors && errors.frequencyType)}
                >
                  <InputLabel id="frequency-type-label">
                    Frequency type
                  </InputLabel>
                  <Controller
                    name="frequencyType"
                    control={control}
                    as={
                      <Select
                        labelId="frequency-type-label"
                        label="Frequency type"
                      >
                        <MenuItem value="weekdays">Weekdays</MenuItem>
                        <MenuItem value="repeat">
                          TODO: Repeat every X days
                        </MenuItem>
                        <MenuItem value="custom">TODO: Custom</MenuItem>
                      </Select>
                    }
                  />
                  <FormHelperText>
                    {errors && errors.frequencyType
                      ? errors.frequencyType.message
                      : ' '}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  error={!!(errors && errors.frequencyValue)}
                >
                  <FormLabel component="legend" className={classes.formLabel}>
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
                    {errors?.frequencyValue?.message || ' '}
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
