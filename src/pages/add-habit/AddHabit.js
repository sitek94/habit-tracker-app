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

import { daysOfTheWeek } from 'data/days-of-the-week';

import { useForm } from 'react-hook-form';

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

const AddHabitPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { db, user } = useFirebase();
  const { openSnackbar } = useSnackbar();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(newHabitSchema),
  });

  const onSubmit = data => {
    addHabit(data);
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

      await db.collection('habits').add(newHabit);

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
                  placeholder="Make your bed"
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
                  placeholder="First thing in the morning, right after getting out of the bed"
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
                    {daysOfTheWeek.map((day, i) => (
                      <FormControlLabel
                        key={day}
                        label={day.slice(0, 3)}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            inputRef={register}
                            name="trackedDays"
                            value={day}
                          />
                        }
                      />
                    ))}
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
