import { useContext, useState } from 'react';

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
  FormLabel,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core';

import AbsoluteCenter from 'components/absolute-center';
import ButtonProgress from 'components/button-progress';

import { FirebaseContext } from 'api/firebase-context';
import { SnackbarContext } from 'components/snackbar';

import { useFormDays, useFormFields } from 'hooks';

import daysOfTheWeek from 'data/days-of-the-week';

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

const AddHabitPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { db, user } = useContext(FirebaseContext);
  const { openSnackbar } = useContext(SnackbarContext);

  // Title and Description
  const [fields, handleFieldChange, resetFields] = useFormFields({
    title: '',
    description: '',
  });
  const { title, description } = fields;

  // Days
  const {
    days,
    toggleDay,
    toggleAllDays,
    resetDays,
    validateDays,
  } = useFormDays(daysOfTheWeek);

  // Add new habit
  const addHabit = async () => {
    setIsLoading(true);

    try {
      const trackedDays = days.filter(d => d.checked).map(d => d.day);
      console.log(trackedDays);

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

      resetFields();
      resetDays();
    }
  };

  // Key down handler
  const handleKeyDown = ({ key, altKey, ctrlKey, metaKey, shiftKey }) => {
    if (!title || !validateDays()) {
      return;
    }

    if (altKey || ctrlKey || metaKey || shiftKey) {
      return;
    }

    if (key === 'Enter') {
      console.log('added habit');
      addHabit();
    }
  };

  return (
    <AbsoluteCenter fullWidth>
      <Container maxWidth="sm">
        <Card raised onKeyDown={handleKeyDown}>
          <CardHeader title="Create a new habit" />

          <CardContent>
            <Grid container direction="column" spacing={2}>
              <Grid item xs>
                <TextField
                  id="title"
                  label="Title"
                  placeholder="Make your bed"
                  variant="outlined"
                  InputLabelProps={{ required: true }}
                  value={title}
                  onChange={handleFieldChange}
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <TextField
                  id="description"
                  label="Description (optional)"
                  placeholder="First thing in the morning, right after getting out of the bed"
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  value={description}
                  onChange={handleFieldChange}
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel
                    component="legend"
                    className={classes.formLabel}
                    onClick={toggleAllDays}
                  >
                    Frequency
                  </FormLabel>
                  <FormGroup row>
                    {days.map(({ id, day, checked}) => (
                      <FormControlLabel
                        key={id}
                        label={day.slice(0, 3)}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={() => toggleDay(id)}
                          />
                        }
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>

          <CardActions className={classes.actions}>
            <Button
              color="primary"
              variant="contained"
              disabled={isLoading || !title || !validateDays()}
              onClick={addHabit}
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
