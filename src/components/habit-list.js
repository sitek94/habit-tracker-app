import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  // Folder as FolderIcon,
} from '@material-ui/icons';
import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { useDeleteHabit } from 'api/habits';
import { Link as RouterLink } from 'react-router-dom';
import { useLocale } from 'locale';

function HabitListItem({ habit }) {
  const { weekdays } = useLocale();

  const { id, name, description, frequency } = habit;

  const { openSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const [deleteHabit, { isLoading }] = useDeleteHabit();

  const handleDeleteClick = async () => {
    // Open the dialog to ask the user if they're sure to delete the habit
    openDialog({
      title: `Remove "${name}" habit?`,
      description: `
      Deleted habit can't be recovered. All data 
      associated with this habit will be deleted.`,
      confirmText: 'Delete',
      onConfirm: () =>
        deleteHabit(id, {
          onSuccess: () => openSnackbar('success', 'Habit removed!'),
          onError: () => openSnackbar('error', 'Error!'),
        }),
      color: 'secondary',
    });
  };

  // Disable buttons when the habit is being deleted
  const disableActions = isLoading;

  return (
    <ListItem button>
      {/* TODO: Let user choose icon */}
      {/* <ListItemIcon>
        <FolderIcon />
      </ListItemIcon> */}

      {/* Name and description */}
      <ListItemText primary={name} secondary={description} />

      {/* Frequency */}
      <Box
        sx={{
          mr: 1,
        }}
      >
        {weekdays.map((day, i) => (
          <Chip
            key={day}
            label={day.slice(0, 1)}
            color={frequency.includes(i) ? 'primary' : 'default'}
          />
        ))}
      </Box>

      {/* Edit link */}
      <IconButton
        component={RouterLink}
        to={`/edit-habit/${id}`}
        aria-label="Edit habit"
        disabled={disableActions}
      >
        <EditIcon />
      </IconButton>

      {/* Delete button */}
      <IconButton
        onClick={handleDeleteClick}
        aria-label="Delete habit"
        disabled={disableActions}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

function HabitList({ habits }) {
  return (
    <List>
      {habits.map((habit) => (
        <HabitListItem key={habit.id} habit={habit} />
      ))}
    </List>
  );
}

export { HabitList };
