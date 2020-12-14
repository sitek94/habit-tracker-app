import { eachDayOfInterval, format, getDay, parseISO, sub } from 'date-fns';
import { sample } from 'lodash';
import { COMPLETED, FAILED } from './constants';

const habits = [
  {
    id: 'reading',
    description: 'Read a book for at least 30 min',
    frequency: [1, 2, 3, 4, 5],
    name: 'Reading',
  },
  {
    id: 'get-up',
    description: "Don't hit that snooze button!",
    frequency: [1, 2, 4, 3, 5, 6],
    name: 'Get up at 6 am',
  },
  {
    id: 'running',
    description: 'Run at least 10km',
    frequency: [1, 3, 5],
    name: 'Running',
  },
  {
    id: 'meditation',
    description: 'Calm your mind before going to sleep',
    frequency: [0, 1, 2, 3, 4, 5, 6],
    name: 'Meditation',
  },
  {
    id: 'guitar',
    description: 'Practice playing the guitar',
    frequency: [2, 4, 6],
    name: 'Guitar',
  },
];

/**
 *
 * @param {string[]} dates - The collection of dates to use.
 * @param {habit[]} habits - The collection of habits to use.
 */
function generateRandomCheckmarks(dates, habits) {
  const checkmarks = [];
  dates.forEach((date) => {
    habits.forEach((habit) => {
      if (habit.frequency.includes(getDay(parseISO(date)))) {
        checkmarks.push({
          id: `${habit.id}-${date}`,
          habitId: habit.id,
          date,
          value: sample([COMPLETED, FAILED]),
        });
      }
    });
  });

  return checkmarks;
}

const end = new Date();
const start = sub(end, { days: 14 });

const dates = eachDayOfInterval({ start, end }).map((d) =>
  format(d, 'yyyy-MM-dd')
);

const checkmarks = generateRandomCheckmarks(dates, habits);

export const guest = {
  habits,
  checkmarks,
};
