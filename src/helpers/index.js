import { COMPLETED, FAILED, EMPTY, CHECKMARK_VALUES } from 'data/constants';

/**
 * Returns a label for given value of the checkmark.
 * 0 - empty, 1 - completed, 2 - skipped, 3 - failed
 * 
 * @param {Number} value 
 */
export function getCheckmarkLabel(value) {
  switch (value) {
    case COMPLETED:
      return 'completed';
    case FAILED:
      return 'failed';
    case EMPTY:
      return 'empty';
    default:
      throw new Error(`Unhandled value ${value}`);
  }
}

/**
 * Returns next checkmark value. 
 * 
 * When gets to the last value (failed) it starts over from the first value (empty).
 * 
 * @param {Number} currentValue 
 */
export function getNextCheckmarkValue(currentValue) {
  const values = CHECKMARK_VALUES;

  if (!values.includes(currentValue)) {
    throw new Error(`Unhandled value ${currentValue}`);
  }

  const nextIndex = (values.indexOf(currentValue) + 1) % values.length;
  const nextValue = values[nextIndex];

  return nextValue;
}

/**
 * Returns next checkmark label. 
 * 
 * @param {Number} currentValue 
 */
export function getNextCheckmarkLabel(currentValue) {
  return getCheckmarkLabel(getNextCheckmarkValue(currentValue));
}

/**
 * Returns an array of checkmark like objects. Each object has two keys:
 * 
 * day - date of the checkmark
 * value - average of completed and failed checkmarks values
 * 
 * @param {Array} arr an array of habits
 */
export function aggregateHabitsCheckmarks(arr) {
  let obj = {};

  arr.forEach((habit) => {
    concatCheckmarkValueByDay(obj, habit.checkmarks);
  });

  return averageCheckmarkValues(obj);
}

/**
 * Concatenate values of checkmarks from source array with corresponding day key
 * in target object.
 * 
 * @param {Object} targetObj target object
 * @param {Array} sourceArr array of checkmarks
 */
function concatCheckmarkValueByDay(targetObj, checkmarksArr) {
  checkmarksArr.forEach(({ day, value }) => {
    if (targetObj[day] === undefined) {
      // If the key doesn't exists create one
      targetObj[day] = [value];
    } else {
      // If the key already exists concat the value of checkmark
      targetObj[day] = targetObj[day].concat(value);
    }
  });
}

/**
 * Calculates average value of checkmarks values for each day.
 * 
 * @param {Object} obj object with day-values key-value pairs
 */
function averageCheckmarkValues(obj) {
  return  Object.entries(obj).map(([day, values]) => {
    return {
      day,
      value: values.reduce((acc, cur) => acc + cur, 0) / values.length
    };
  });
}


