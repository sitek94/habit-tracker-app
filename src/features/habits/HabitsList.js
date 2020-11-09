import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchHabits, selectAllHabits } from './habitsSlice';

import axios from 'libraries/axios';
import { useFirebase } from 'features/firebase';

export const HabitsList = () => {
  const dispatch = useDispatch();
  const habits = useSelector(selectAllHabits);

  const habitStatus = useSelector(state => state.habits.status);
  const error = useSelector(state => state.habits.error);

  useEffect(() => {
    if (habitStatus === 'idle') {
      dispatch(fetchHabits());
    }
  }, [habitStatus, dispatch]);

  let content;

  if (habitStatus === 'loading') {
    content = <div className="loader">Loading...</div>;
  } else if (habitStatus === 'succeeded') {
    content = habits.map(habit => <HabitItem key={habit.id} habit={habit} />);
  } else if (habitStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1>Habits List</h1>
      {content}
    </div>
  );
};

function HabitItem({ habit }) {
  const { id, title, trackedDays } = habit;

  const { user } = useFirebase();

  const [token, setToken] = useState();

  useEffect(() => {
    user.getIdTokenResult()
      .then(res => setToken(res.token));
  }, [user]);

  const userToken = user.getIdTokenResult();
  
  useEffect(() => {
    axios
      .get('/logs.json', {
        params: {
          auth: token,
          orderBy: 'habitId',
          equalTo: habit.title,
        },
      })
      .then(res => {
        console.log(habit.id);
        console.log(habit.title, res);
      })
      .catch(console.log);
  }, [habit, token]);

  return (
    <li key={id}>
      <h3>Name: {title}</h3>
      <ul>
        {trackedDays.map(day => (
          <li key={day}>{day}</li>
        ))}
      </ul>
    </li>
  );
}
