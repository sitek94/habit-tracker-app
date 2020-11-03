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

import { FirebaseContext } from 'api/firebase-context';

import AbsoluteCenter from 'components/absolute-center';
import ButtonProgress from 'components/button-progress';

import { SnackbarContext } from 'components/snackbar';

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

const dayNames = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const initialDays = {
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
  Saturday: false,
  Sunday: false,
};

const AddHabitPage = () => {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  // Contexts
  const { db, user } = useContext(FirebaseContext);
  const { openSnackbar } = useContext(SnackbarContext);

  // Title
  const [title, setTitle] = useState('');
  const handleTitleChange = e => setTitle(e.target.value);

  // Description
  const [description, setDescription] = useState('');
  const handleDescriptionChange = e => setDescription(e.target.value);

  // Days
  const [days, setDays] = useState(initialDays);

  const toggleDay = day => {
    setDays({ ...days, [day]: !days[day] });
  };

  const toggleAllDays = () => {
    const toggledDays = {};
    dayNames.forEach(day => (toggledDays[day] = !days[day]));
    setDays(toggledDays);
  };

  const validateDays = () => Object.values(days).some(Boolean);

  // Add new habit
  const addHabit = async () => {
    setIsLoading(true);

    try {
      const trackedDays = dayNames.filter(day => days[day]);

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

      setTitle('');
      setDescription('');
      setDays(initialDays);
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
                  label="Title"
                  placeholder="Make your bed"
                  variant="outlined"
                  InputLabelProps={{ required: true }}
                  value={title}
                  onChange={handleTitleChange}
                  disabled={isLoading}
                  fullWidth
                />
              </Grid>

              <Grid item xs>
                <TextField
                  label="Description (optional)"
                  placeholder="First thing in the morning, right after getting out of the bed"
                  variant="outlined"
                  InputLabelProps={{ required: false }}
                  value={description}
                  onChange={handleDescriptionChange}
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
                    {dayNames.map(day => (
                      <FormControlLabel
                        key={day}
                        label={day.slice(0, 3)}
                        labelPlacement="bottom"
                        control={
                          <Checkbox
                            checked={days[day]}
                            onChange={() => toggleDay(day)}
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
