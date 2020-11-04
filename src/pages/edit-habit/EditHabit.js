import { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

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

import { useFirebase } from 'features/firebase';
import { SnackbarContext } from 'components/snackbar';

import { useFormDays, useFormFields } from 'hooks';
import daysOfTheWeek from 'data/days-of-the-week';

import { HabitsContext } from 'pages/dashboard/Dashboard';

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

const EditHabitPage = (props) => {
  const classes = useStyles();



  const { habitId } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  // # TODO: Go back to all habits after saving the habit ???
  const [habit, setHabit] = useState();

   // Contexts
   const { db, user } = useFirebase();
   const { openSnackbar } = useContext(SnackbarContext);
 
   const habits = useContext(HabitsContext)

   console.log(habits);
  //  // Title and Description
  //  const [fields, handleFieldChange, resetFields] = useFormFields({
  //   title: '',
  //   description: '',
  // });
  // const { title, description } = fields;

  // // Days
  // const {
  //   days,
  //   dayNames,
  //   toggleDay,
  //   toggleAllDays,
  //   resetDays,
  //   validateDays,
  //   getDays
  // } = useFormDays();

  

  // useEffect(() => {
  //   const fetchHabit = async () => {
  //     try {
  //       const habitRef = db.collection('habits').doc(habitId);
  //       const doc = await habitRef.get();

  //       if (!doc.exists) {
  //         console.log('No such document!');
  //       } else {

  //         const data = doc.data();
         
  //         setHabit(data);
  //         console.log('Document data: ', doc.data());
  //       }

  //     } catch (error) {
  //       console.log('Error when fetching the habit for editing: ', error);
  //     }
  //   }
  //   fetchHabit();
  // }, [db, habitId]);

  


// Key down handler
const handleKeyDown = ({ key, altKey, ctrlKey, metaKey, shiftKey }) => {
    // if (!title || !validateDays()) {
    //   return;
    // }

    // if (altKey || ctrlKey || metaKey || shiftKey) {
    //   return;
    // }

    // if (key === 'Enter') {
    //   console.log('added habit');
    //   addHabit();
    // }
};

  if (!habit) return <h1>No data</h1>

  const { title, description, trackedDays } = habit;

  return (
    <AbsoluteCenter fullWidth>
    <Container maxWidth="sm">
      <Card raised onKeyDown={handleKeyDown}>
        <CardHeader title="Create a new habit" />

        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                label="New Title"
                placeholder="Make your bed"
                variant="outlined"
                InputLabelProps={{ required: false }}
                // value={title}
                // onChange={handleFieldChange}
                disabled={isLoading}
                fullWidth
              />
            </Grid>

            <Grid item xs>
              <TextField
                label="New Description"
                placeholder="First thing in the morning, right after getting out of the bed"
                variant="outlined"
                InputLabelProps={{ required: false }}
                // value={description}
                // onChange={handleFieldChange}
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
                //  onClick={toggleAllDays}
                >
                  Frequency
                </FormLabel>
                <FormGroup row>
                  {trackedDays.map(({ id, day, checked }) => (
                    <FormControlLabel
                      key={id}
                      label={day.slice(0, 3)}
                      labelPlacement="bottom"
                      control={
                        <Checkbox
                          defaultChecked={checked}
                          
                          onChange={() => {}}
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
         //   disabled={isLoading || !title || !validateDays()}
            //onClick={addHabit}
          >
            Add habit
            {isLoading && <ButtonProgress />}
          </Button>
        </CardActions>
      </Card>
    </Container>
  </AbsoluteCenter>
  )
}

export default EditHabitPage;