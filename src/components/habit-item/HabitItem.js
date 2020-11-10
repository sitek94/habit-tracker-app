import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  Button,
  Chip,
  IconButton,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Folder as FolderIcon,
} from '@material-ui/icons';

import daysOfTheWeek from 'data/days-of-the-week';
import { useDialog } from 'components/dialog/dialog-context';
import { useSnackbar } from 'components/snackbar';
import { useFirebase } from 'services/firebase';
import { useHabits } from 'features/habits';

const useStyles = makeStyles(({ spacing }) => ({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
}));

const HabitItem = ({ id, title, trackedDays }) => {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const { db } = useFirebase();
  const { habits, setHabits } = useHabits();

  const { openDialog, closeDialog } = useDialog();
  const { openSnackbar } = useSnackbar();

  // Removes the habit from the database, if success removes it locally
  const deleteHabit = async () => {
    setIsLoading(true);

    try {
      await db.collection('habits').doc(id).delete();

      setHabits(habits.filter(habit => habit.id !== id));

      openSnackbar('success', 'Habit deleted!');
    } catch ({ message }) {
      openSnackbar('error', message);
    } finally {
      setIsLoading(false);
    }
  };

  // Takes the user to `Edit habit` page
  const handleEditClick = () => {
    history.push(`/dashboard/habits/${id}`);
  };

  // Displays the alert dialog to get a confirmation, then deletes the habit
  const handleDeleteClick = () => {
    openDialog({
      title: `Delete "${title}" habit?`,
      contentText: `Deleted habit can't be recovered. All data associated with this habit will be deleted.`,
      actions: (
        <>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Delete the habit and close the dialog
              closeDialog();
              deleteHabit();
            }}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Delete habit
          </Button>
        </>
      ),
    });
  };

  return (
    <TableRow hover>
      <TableCell className={classes.minWidth}>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        align="left"
        className={classes.minWidth}
      >
        <Typography variant="body1">{title}</Typography>
      </TableCell>

      <TableCell align="left">
        {daysOfTheWeek.map(day => (
          <Chip
            key={day}
            label={day.slice(0, 2)}
            color={trackedDays.includes(day) ? 'primary' : 'default'}
          />
        ))}
      </TableCell>

      <TableCell align="right" className={classes.minWidth}>
        <IconButton
          onClick={handleEditClick}
          aria-label="Edit habit"
          disabled={isLoading}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
          aria-label="Delete habit"
          disabled={isLoading}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

HabitItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trackedDays: PropTypes.array.isRequired,
};

export default HabitItem;
