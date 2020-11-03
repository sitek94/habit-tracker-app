import { Button, makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import FolderIcon from '@material-ui/icons/Folder';
import { FirebaseContext } from 'api/firebase-context';
import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
  actions: {
    justifyContent: 'flex-end',
  },
  divider: {
    margin: 'auto',
  },
}));

const HabitItem = ({ habit: { id, title } }) => {
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/habits/${id}`);
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={title} secondary="Secondary text" />
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
  const classes = useStyles();

  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { db, user } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchHabits = async () => {
      console.log('Fetching');
      setIsLoading(true);

      try {
        const habitsRef = await db.collection('habits');
        const snapshot = await habitsRef.where('uid', '==', user.uid).get();

        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        let fetchedHabits = [];
        snapshot.forEach(doc => {
          const { title } = doc.data();

          fetchedHabits.push({
            id: doc.id,
            title,
          });
        });

        setHabits(fetchedHabits);
      } catch (error) {
        console.log('Error when fetching habits: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [db, user]);

  console.log(habits);

  return (
    <List>
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </List>
  );
};



export default HabitsPage;
