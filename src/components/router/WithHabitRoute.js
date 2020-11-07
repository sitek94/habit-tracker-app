import { Redirect, Route } from 'react-router-dom';

import { useHabits } from 'features/habits';

const WithHabitRoute = ({ component: Component, ...rest }) => {
  const { habitId } = rest.computedMatch.params;

  const { habits } = useHabits();

  const habit = habits.find(habit => habit.id === habitId);

  return (
    <Route {...rest}>
      {habit ? (
        <Component habit={habit} />
      ) : (
        <Redirect
          to={{
            pathname: '/not-found',
            state: {
              title: `Habit not found`,
              description: `The habit with given ID doesn't exists.`,
            },
          }}
        />
      )}
    </Route>
  );
};

export default WithHabitRoute;
