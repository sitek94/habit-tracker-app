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

import { useDialog } from 'context/dialog-context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';

import { useFirebase } from 'services/firebase';
import dayjs from 'services/dayjs';

const useStyles = makeStyles({
  // A trick to set width of the table cell to its content
  minWidth: {
    width: '1%',
    whiteSpace: 'nowrap',
  },
});

const HabitItem = ({ habit, onDeleteClick }) => {
  const { id, name, frequency } = habit;

  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const { db } = useFirebase();

  const { openDialog, closeDialog } = useDialog();
  const { openSnackbar } = useSnackbar();

  // Removes the habit from the database, if success removes it locally
  const deleteHabit = async () => {
    setIsLoading(true);

    try {
      const updates = {};

      // Delete the habit
      updates[`/habits/${id}`] = null;
      // Delete all the checkmarks associated with the habit
      updates[`/habitCheckmarks/${id}`] = null;

      await db.ref().update(updates);

      openSnackbar('success', 'Habit removed!');

      // Invoke the event handler that will remove the habit locally
      // and cause a rerender
      onDeleteClick();
    } catch (error) {
      console.log('Something went wrong when deleting a habit', error);

      openSnackbar('error', 'Something went wrong when deleting the habit');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    // Takes the user to `Edit habit` page
    history.push(`/dashboard/habits/${id}`);
  };

  // Displays the alert dialog to get a confirmation, then deletes the habit
  const handleDeleteClick = () => {
    openDialog({
      title: `Delete "${name}" habit?`,
      contentText: `Deleted habit can't be recovered. All data associated with this habit will be deleted.`,
      actions: (
        <>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              // Delete the habit and close the dialog
              deleteHabit();
              closeDialog();
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

  /**
   * We support different types (at the moment just one though) of
   * a habit frequency.
   *
   * So this types have to be handled differently.
   *
   */
  const renderFrequency = () => {
    const { type, value } = frequency;

    switch (type) {
      // Weekdays - render a list of `Chips`, higlight the days that
      // are tracked
      case 'weekdays':
        if (!Array.isArray(value)) {
          throw new Error('For type "weekdays" value must be an array');
        }
      
        const weekdays = dayjs.weekdays(dayjs());
        const trackedWeekdays = value;

        // Weekdays are stored as numbers 0-6, so we can use indexes
        // to check if the given day index is in the tracked array
        return weekdays.map((name, i) => (
          <Chip
            key={name}
            label={name.slice(0, 2)}
            color={trackedWeekdays.includes(i) ? 'primary' : 'default'}
          />
        ));

      default:
        throw new Error(`Unhandled frequency type: ${type}`);
    }
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
        <Typography variant="body1">{name}</Typography>
      </TableCell>

      <TableCell align="left">{renderFrequency()}</TableCell>

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

export default HabitItem;
