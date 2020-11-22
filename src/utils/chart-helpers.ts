import { COMPLETED, FAILED } from 'data/constants';

/*
The data that comes from database is an object where
each key is a habit.

data = 
{
  "habit-id-1": 
    {
      "2020-10-11": -1,
      "2020-10-12":  1,
      "2020-10-13": -1,
    },
  "habit-id-2": 
    {
      "2020-10-11": -1,
      "2020-10-12":  1,
      "2020-10-13": -1,
    }
}

Each habit is an object where keys are dates, and values
are completion state of the checkmark
*/

type Checkmark = {
  [key: string]: number;
};

type AggregatedCheckmark = {
  [key: string]: number[];
};

type Habit = {
  [key: string]: Checkmark;
};

/**
 * Aggregates all the habits checkmarks
 *
 */
function aggregate(habits: Habit) {
  let obj: AggregatedCheckmark = {};

  // Iterate over each habit
  Object.values(habits).forEach((checkmarks) => {
    // Iterate over each habit's checkmarks
    Object.entries(checkmarks).forEach(([date, value]) => {
      if (obj[date] === undefined) {
        // If there is no date in helper object yet, add it
        obj[date] = [value];
      } else {
        // The date already exists so concat the value
        obj[date] = obj[date].concat(value);
      }
    });
  });

  return obj;
}

/**
 * Prepares the checkmarks to be used in heatmap chart
 *
 */
function heatmapDataFrom(checkmarks: AggregatedCheckmark) {
  return Object.entries(checkmarks).map(([date, values]) => {
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;

    return {
      day: date,
      value: avg,
    };
  });
}

/**
 * Prepares the checkmarks to be used in bar chart
 */
function barchartDataFrom(checkmarks: AggregatedCheckmark, dates: string[]) {
  return dates.map((date) => {
    let values = checkmarks[date] || null;

    return {
      date,
      completed: values ? countValues(values, COMPLETED) : null,
      failed: values ? -countValues(values, FAILED) : null,
    };
  });
}

/**
 * Counts the occurences of given value in the array
 *
 * @param arr source array of numbers
 * @param value a value to count
 */
function countValues(arr: number[], value: number) {
  return arr.reduce((acc, cur) => (cur === value ? acc + 1 : acc), 0);
}

export { barchartDataFrom, heatmapDataFrom, aggregate };
