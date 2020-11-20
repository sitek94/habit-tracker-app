import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Folder as FolderIcon,
} from '@material-ui/icons';
import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { useDeleteHabit } from 'hooks/useDeleteHabit';
import { Link as RouterLink } from 'react-router-dom';
import { weekdays } from 'utils/misc';

function HabitListItem({ habit }) {
  const { id, name, description, frequency } = habit;

  const { openSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const [deleteHabit, { isLoading }] = useDeleteHabit();

  const handleDeleteClick = async () => {
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

  return (
    <ListItem button>
      {/* TODO: Let user choose icon */}
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>

      {/* Name and description */}
      <ListItemText primary={name} secondary={description} />

      {/* Frequency */}
      <Box mr={1}>
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
        to={`/edit-habit/${id}`}
        component={RouterLink}
        aria-label="Edit habit"
        disabled={isLoading}
      >
        <EditIcon />
      </IconButton>

      {/* Delete button */}
      <IconButton
        onClick={handleDeleteClick}
        aria-label="Delete habit"
        disabled={isLoading}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

function HabitList({ habits }) {
  return (
    <List>
      {habits.map(habit => (
        <HabitListItem key={habit.id} habit={habit} />
      ))}
    </List>
  );
}

export { HabitList };
