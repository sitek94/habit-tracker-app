import daysOfTheWeek from 'data/days-of-the-week';
import { DatesRangeController } from 'features/dates-range';
import { useHabits } from 'features/habits';
import HabitItem from './HabitItem';

const Dashboard = () => {
  const { habits } = useHabits();

  return (
    <>
      <DatesRangeController />
      <table>
        <thead>
          <tr>
            <th>Habit name</th>
            {daysOfTheWeek.map(day => (
              <th key={day}>{day.slice(0, 3)}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {habits.map(({ id, title, trackedDays }) => (
            <HabitItem
              key={id}
              id={id}
              title={title}
              trackedDays={trackedDays}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
