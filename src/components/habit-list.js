import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  // ListItemIcon,
  ListItemText,
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
import { useDeleteHabit } from 'api/habits';
import { Link as RouterLink } from 'react-router-dom';
import { useLocale } from 'localization';

import { useTranslation } from 'translations';

// Translations
const translations = {
  dialogTitle: {
    pl: 'Usunąć',
    es: 'Borrar',
    en: 'Delete',
  },
  dialogDescription: {
    pl: `
    Usunięty nawyk nie może zostać odzyskany. Wszystkie dane
    zostanę usunięte.`,
    es: `
    Esta acción eliminará permanentemente este hábito. Esto no se puede deshacer.
    `,
    en: `
    Deleted habit can't be recovered. All data 
    associated with this habit will be deleted.`,
  },
  dialogConfirmButton: {
    pl: 'Usuń',
    es: 'Borrar',
    en: 'Delete',
  },
  successMessage: {
    pl: 'Nawyk usunięty!',
    es: 'Hábito borrado!',
    en: 'Habit deleted!',
  },
  editButton: {
    pl: 'Edytuj nawyk',
    es: 'Editar el hábito',
    en: 'Edit habit',
  },
  deleteButton: {
    pl: 'Usuń nawyk',
    es: 'Borrar el hábito',
    en: 'Delete habit',
  },
};

function HabitListItem({ habit }) {
  const t = useTranslation(translations);
  const { weekdays } = useLocale();

  const { id, name, description, frequency } = habit;

  const { openSnackbar } = useSnackbar();
  const { openDialog } = useDialog();

  const [deleteHabit, { isLoading }] = useDeleteHabit();

  const handleDeleteClick = () => {
    // Open the dialog to ask the user if they're sure to delete the habit
    openDialog({
      title: `${t('dialogTitle')} "${name}"?`,
      description: t('dialogDescription'),
      confirmText: t('dialogConfirmButton'),
      onConfirm: () => {
        deleteHabit(id, {
          onSuccess: () => openSnackbar('success', t('successMessage')),
          onError: (error) => openSnackbar('error', error.message),
        });
      },
      color: 'secondary',
    });
  };

  // Disable buttons when the habit is being deleted
  const disableActions = isLoading;

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
      <IconButton
        size={isXs ? 'small' : 'medium'}
        component={RouterLink}
        to={`/edit-habit/${id}`}
        aria-label={t('editButton')}
        disabled={disableActions}
      >
        <EditIcon />
      </IconButton>

      {/* Delete button */}
      <IconButton
        size={isXs ? 'small' : 'medium'}
        onClick={handleDeleteClick}
        aria-label={t('deleteButton')}
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
