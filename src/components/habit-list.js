import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  // Folder as FolderIcon,
} from '@material-ui/icons';
import { useDialog } from 'context/dialog-context';
import { useSnackbar } from 'context/snackbar-context';
import { useDeleteHabitMutationMutation } from 'api/habits';
import { Link as RouterLink } from 'react-router-dom';
import { useLocale } from 'localization';
import { useTranslation } from 'translations';

function HabitListItem({ habit }) {
  const t = useTranslation();
  const { weekdays } = useLocale();

  const { id, name, description, frequency } = habit;

  const { openSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const deleteHabitMutation = useDeleteHabitMutationMutation();

  const handleDeleteClick = () => {
    // Open the dialog to ask the user if they're sure to delete the habit
    openDialog({
      title: `${t('deleteHabitQuestion')} "${name}"?`,
      description: t('deleteHabitWarning'),
      confirmText: t('deleteHabitConfirmation'),
      onConfirm: () => {
        deleteHabitMutation.mutate(id, {
          onSuccess: () => openSnackbar('success', t('habitDeleted')),
          onError: (error) => openSnackbar('error', error.message),
        });
      },
      color: 'secondary',
    });
  };

  // Disable buttons when the habit is being deleted
  const disableActions = deleteHabitMutation.isLoading;

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));

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
            size={isXs ? 'small' : 'medium'}
            key={day}
            label={day.slice(0, 1)}
            color={frequency.includes(i) ? 'primary' : 'default'}
          />
        ))}
      </Box>

      {/* Edit link */}
      <Tooltip title={t('editHabit')}>
        <IconButton
          size={isXs ? 'small' : 'medium'}
          component={RouterLink}
          to={`/edit-habit/${id}`}
          aria-label={t('editHabit')}
          disabled={disableActions}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Delete button */}
      <Tooltip title={t('deleteHabit')}>
        <IconButton
          size={isXs ? 'small' : 'medium'}
          onClick={handleDeleteClick}
          aria-label={t('deleteHabit')}
          disabled={disableActions}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
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
