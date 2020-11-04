import { useHistory } from 'react-router-dom';

import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Folder as FolderIcon,
} from '@material-ui/icons';

import { useHabits } from 'features/habits';

const HabitItem = ({ habit: { id, title, description } }) => {
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/dashboard/habits/${id}`);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary={description} />
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const HabitsPage = () => {
  const { habits } = useHabits();

  return (
    <List>
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </List>
  );
};

export default HabitsPage;
